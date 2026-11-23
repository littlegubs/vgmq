import { MigrationInterface, QueryRunner } from 'typeorm'

export class NullPassword1736757619296 implements MigrationInterface {
    name = 'NullPassword1736757619296'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE \`user\` CHANGE \`password\` \`password\` varchar(255) NULL`,
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE \`user\` CHANGE \`password\` \`password\` varchar(255) NOT NULL`,
        )
    }
}
