import { Expose } from 'class-transformer'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

import { Collection } from '../../games/entity/collection.entity'

export enum LobbyFilterType {
    Exclusion = 'exclusion',
    Limitation = 'limitation',
    Inclusion = 'inclusion',
}

@Entity()
export class LobbyCollectionFilter {
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
    @ManyToOne(() => Collection, { eager: true })
    collection: Collection
}
