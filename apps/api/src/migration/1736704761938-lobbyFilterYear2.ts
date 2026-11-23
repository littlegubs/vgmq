import { MigrationInterface, QueryRunner } from 'typeorm'

export class LobbyFilterYear21736704761938 implements MigrationInterface {
    name = 'LobbyFilterYear21736704761938'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE \`lobby\` ADD \`filterByYear\` tinyint NOT NULL DEFAULT 0`,
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`lobby\` DROP COLUMN \`filterByYear\``)
    }
}
