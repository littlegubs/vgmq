import { Expose } from 'class-transformer'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

import { Genre } from '../../games/entity/genre.entity'
import { LobbyFilterType } from './lobby-collection-filter.entity'

@Entity()
export class LobbyGenreFilter {
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
    @ManyToOne(() => Genre, { eager: true })
    genre: Genre
}
