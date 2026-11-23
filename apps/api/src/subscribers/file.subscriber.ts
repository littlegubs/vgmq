import { DataSource, EntitySubscriberInterface, EventSubscriber, RemoveEvent } from 'typeorm'

import { File } from '../entity/file.entity'
import { StorageService } from '../storage/storage.interface'
import { PRIVATE_STORAGE, PUBLIC_STORAGE } from '../storage/storage.constants'
import { Inject } from '@nestjs/common'

@EventSubscriber()
export class FileSubscriber implements EntitySubscriberInterface<File> {
    constructor(
        connection: DataSource,
        @Inject(PRIVATE_STORAGE) private privateStorageService: StorageService,
        @Inject(PUBLIC_STORAGE) private publicStorageService: StorageService,
    ) {
        connection.subscribers.push(this)
    }

    listenTo(): typeof File {
        return File
    }

    async afterRemove(event: RemoveEvent<File>): Promise<void> {
        if (event.entity?.path) {
            if (event.entity.private) {
                await this.privateStorageService.deleteObject(event.entity?.path)
            } else {
                await this.publicStorageService.deleteObject(event.entity?.path)
            }
        }
    }
}
