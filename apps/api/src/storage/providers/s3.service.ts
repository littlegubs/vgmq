import { Readable } from 'stream'

import {
    DeleteObjectCommand,
    GetObjectCommand,
    PutObjectCommand,
    S3Client,
} from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { StorageService } from '../storage.interface'

@Injectable()
export class S3StorageService implements StorageService {
    private readonly client: S3Client
    private readonly bucketName?: string
    private readonly logger = new Logger(S3StorageService.name)

    constructor(
        private configService: ConfigService,
        type: 'PRIVATE' | 'PUBLIC' | 'CLIPS',
    ) {
        const accessId = this.configService.get(`${type}_S3_ID`)
        const secretKey = this.configService.get(`${type}_S3_SECRET`)
        const region = this.configService.get(`${type}_S3_REGION`)
        const endpoint = this.configService.get<string>(`${type}_S3_ENDPOINT`)
        this.bucketName = this.configService.get(`${type}_S3_BUCKET`)
        if (!accessId || !secretKey || !region || !this.bucketName) {
            throw new InternalServerErrorException(`missing ${type} amazon credentials`)
        }
        this.client = new S3Client({
            region,
            ...(endpoint && { endpoint }),
            credentials: {
                accessKeyId: accessId,
                secretAccessKey: secretKey,
            },
        })
    }

    async putObject(filePath: string, file: Buffer): Promise<void> {
        await this.client.send(
            new PutObjectCommand({
                Bucket: this.bucketName,
                Key: filePath,
                Body: file,
            }),
        )
    }

    async getObject(filePath: string): Promise<Buffer<ArrayBufferLike>> {
        this.logger.log({ msg: `getting object for ${filePath}`, from: 'getObject' })
        const object = await this.client.send(
            new GetObjectCommand({
                Bucket: this.bucketName,
                Key: filePath,
            }),
        )
        return this.streamToBuffer(object.Body as Readable)
    }

    async getPublicUrl(filePath: string): Promise<string> {
        this.logger.log({ msg: `getting signed url for ${filePath}`, from: 'getSignedUrl' })
        return getSignedUrl(
            this.client,
            new GetObjectCommand({
                Bucket: this.bucketName,
                Key: filePath,
            }),
        )
    }

    async deleteObject(filePath: string): Promise<void> {
        await this.client.send(
            new DeleteObjectCommand({
                Bucket: this.bucketName,
                Key: filePath,
            }),
        )
    }

    private async streamToBuffer(stream: Readable): Promise<Buffer> {
        return new Promise((resolve, reject) => {
            const chunks: any[] = []
            stream.on('data', (chunk: any) => {
                chunks.push(chunk)
            })
            stream.on('error', reject)
            stream.on('end', () => resolve(Buffer.concat(chunks)))
        })
    }
}
