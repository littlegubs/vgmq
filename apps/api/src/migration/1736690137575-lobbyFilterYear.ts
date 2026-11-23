import { MigrationInterface, QueryRunner } from 'typeorm'

export class LobbyFilterYear1736690137575 implements MigrationInterface {
    name = 'LobbyFilterYear1736690137575'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`lobby\` ADD \`premium\` tinyint NOT NULL DEFAULT 0`)
        await queryRunner.query(`ALTER TABLE \`lobby\` ADD \`filterMinYear\` int NOT NULL`)
        await queryRunner.query(`ALTER TABLE \`lobby\` ADD \`filterMaxYear\` int NOT NULL`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`lobby\` DROP COLUMN \`filterMaxYear\``)
        await queryRunner.query(`ALTER TABLE \`lobby\` DROP COLUMN \`filterMinYear\``)
        await queryRunner.query(`ALTER TABLE \`lobby\` DROP COLUMN \`premium\``)
    }
}
