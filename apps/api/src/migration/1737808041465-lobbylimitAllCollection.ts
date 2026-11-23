import { MigrationInterface, QueryRunner } from 'typeorm'

export class LobbylimitAllCollection1737808041465 implements MigrationInterface {
    name = 'LobbylimitAllCollection1737808041465'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE \`lobby\` ADD \`limitAllCollectionsTo\` int NOT NULL DEFAULT '0'`,
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`lobby\` DROP COLUMN \`limitAllCollectionsTo\``)
    }
}
