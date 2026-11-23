import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AlternativeName } from '../games/entity/alternative-name.entity'
import { AlternativeNamesController } from './alternative-names.controller'
import { AlternativeNamesService } from './alternative-names.service'

@Module({
    controllers: [AlternativeNamesController],
    imports: [TypeOrmModule.forFeature([AlternativeName]), HttpModule],
    providers: [AlternativeNamesService],
})
export class AlternativeNamesModule {}
