import { Expose } from 'class-transformer'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

import { Theme } from '../../games/entity/theme.entity'
import { LobbyFilterType } from './lobby-collection-filter.entity'

@Entity()
export class LobbyThemeFilter {
    @PrimaryGeneratedColumn()
    @Expose({ groups: ['lobby'] })
    id: number

    @Column({
        type: 'enum',
        enum: LobbyFilterType,
        default: LobbyFilterType.Exclusion,
    })
    @Expose({ groups: ['lobby'] })
    type: LobbyFilterType

    @Column({ type: 'int' })
    @Expose({ groups: ['lobby'] })
    limitation: number

    @Expose({ groups: ['lobby'] })
    @ManyToOne(() => Theme, { eager: true })
    theme: Theme
}
