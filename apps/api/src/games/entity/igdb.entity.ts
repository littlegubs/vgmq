import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    BaseEntity,
} from 'typeorm'

@Entity()
export class IgdbClient extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    accessToken: string

    @Column()
    @CreateDateColumn()
    createdAt: Date

    @Column()
    @UpdateDateColumn()
    updatedAt: Date
}
