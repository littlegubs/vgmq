import { Storage } from '@google-cloud/storage'
import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { GetSignedUrlConfig } from '@google-cloud/storage'
import { StorageService } from '../storage.interface'

@Injectable()
export class GcsStorageService implements StorageService {
    private readonly storage: Storage
    private readonly bucketName?: string
    private readonly logger = new Logger(GcsStorageService.name)

    constructor(
        private configService: ConfigService,
        type: 'PRIVATE' | 'PUBLIC' | 'CLIPS',
    ) {
        this.bucketName = this.configService.get(`${type}_GCS_BUCKET`)
        const projectId = this.configService.get(`${type}_GCS_PROJECT_ID`)
        const keyFilePath = this.configService.get(`${type}_GCS_KEYFILE_PATH`)

        if (!projectId || !keyFilePath || !this.bucketName) {
            throw new InternalServerErrorException(
                `Missing ${type} Google Cloud Storage credentials`,
            )
        }

        this.storage = new Storage({ projectId, keyFilename: keyFilePath })
    }

    async putObject(filePath: string, file: Buffer): Promise<void> {
        await this.storage.bucket(this.bucketName!).file(filePath).save(file)
    }

    async getObject(filePath: string): Promise<Buffer> {
        const [data] = await this.storage.bucket(this.bucketName!).file(filePath).download()
        return data
    }

    async deleteObject(filePath: string): Promise<void> {
        await this.storage.bucket(this.bucketName!).file(filePath).delete()
    }

    async getPublicUrl(filePath: string): Promise<string> {
        const options: GetSignedUrlConfig = {
            version: 'v4',
            action: 'read',
            expires: Date.now() + 15 * 60 * 1000, // 15 minutes
        }
        const [url] = await this.storage
            .bucket(this.bucketName!)
            .file(filePath)
            .getSignedUrl(options)
        return url
    }
}
