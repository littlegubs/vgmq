import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { File } from '../entity/file.entity'
import { Music } from '../games/entity/music.entity'
import { MusicSubscriber } from './subscribers/music.subscriber'

@Module({
    imports: [TypeOrmModule.forFeature([Music, File])],
    providers: [MusicSubscriber],
})
export class MusicsModule {}
