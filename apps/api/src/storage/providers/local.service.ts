import { Injectable, Logger, InternalServerErrorException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import * as fs from 'fs/promises'
import * as path from 'path'
import { StorageService } from '../storage.interface'

@Injectable()
export class LocalStorageService implements StorageService {
    private readonly logger = new Logger(LocalStorageService.name)
    private readonly storagePath?: string

    constructor(
        private configService: ConfigService,
        type: 'PRIVATE' | 'PUBLIC' | 'CLIPS',
    ) {
        this.storagePath = this.configService.get<string>(`${type}_LOCAL_STORAGE_PATH`)

        if (!this.storagePath) {
            throw new InternalServerErrorException(`${type} Local storage configuration is missing`)
        }
    }

    private getFullPath(filePath: string): string {
        return path.join(this.storagePath!, filePath)
    }

    async putObject(filePath: string, file: Buffer): Promise<void> {
        const fullPath = this.getFullPath(filePath)
        const dir = path.dirname(fullPath)
        try {
            await fs.mkdir(dir, { recursive: true })
            await fs.writeFile(fullPath, file)
            this.logger.log(`File saved locally at: ${fullPath}`)
        } catch (error) {
            this.logger.error(`Failed to save file to ${fullPath}`, error)
            throw new InternalServerErrorException('Error saving file locally')
        }
    }

    async getObject(filePath: string): Promise<Buffer> {
        const fullPath = this.getFullPath(filePath)
        try {
            return await fs.readFile(fullPath)
        } catch (error) {
            this.logger.error(`Failed to read file from ${fullPath}`, error)
            throw new InternalServerErrorException('Error reading file')
        }
    }

    async deleteObject(filePath: string): Promise<void> {
        const fullPath = this.getFullPath(filePath)
        try {
            await fs.unlink(fullPath)
        } catch (error) {
            this.logger.error(`Failed to delete file from ${fullPath}`, error)
        }
    }

    async getPublicUrl(filePath: string): Promise<string> {
        // not actually a url
        return `${this.storagePath}/${filePath}`
    }
}
