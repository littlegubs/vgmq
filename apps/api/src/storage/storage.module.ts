import { Module, Global, Provider } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { LocalStorageService } from './providers/local.service'
import { GcsStorageService } from './providers/gcs.service'
import { S3StorageService } from './providers/s3.service'
import { PRIVATE_STORAGE, PUBLIC_STORAGE, CLIPS_STORAGE } from './storage.constants'

function createStorageProvider(type: 'PRIVATE' | 'PUBLIC' | 'CLIPS'): Provider {
    return {
        provide:
            type === 'PRIVATE'
                ? PRIVATE_STORAGE
                : type === 'PUBLIC'
                  ? PUBLIC_STORAGE
                  : CLIPS_STORAGE,
        useFactory: (configService: ConfigService) => {
            const provider = configService.get<string>(`${type}_STORAGE_PROVIDER`)
            switch (provider) {
                case 's3':
                    return new S3StorageService(configService, type)
                case 'gcs':
                    return new GcsStorageService(configService, type)
                case 'local':
                    return new LocalStorageService(configService, type)
                default:
                    throw new Error(
                        `Invalid ${type} storage provider: ${provider}. Must be 's3', 'gcs', or 'local'.`,
                    )
            }
        },
        inject: [ConfigService],
    }
}

export const privateStorageProvider = createStorageProvider('PRIVATE')
export const publicStorageProvider = createStorageProvider('PUBLIC')
export const clipsStorageProvider = createStorageProvider('CLIPS')

@Global()
@Module({
    imports: [ConfigModule],
    providers: [privateStorageProvider, publicStorageProvider, clipsStorageProvider],
    exports: [PRIVATE_STORAGE, PUBLIC_STORAGE, CLIPS_STORAGE],
})
export class StorageModule {}
