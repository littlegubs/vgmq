import { MigrationInterface, QueryRunner } from 'typeorm'

export class LobbyAllowCollection1737199761540 implements MigrationInterface {
    name = 'LobbyAllowCollection1737199761540'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE \`lobby\` ADD \`allowCollectionAnswer\` tinyint NOT NULL DEFAULT 0`,
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`lobby\` DROP COLUMN \`allowCollectionAnswer\``)
    }
}
