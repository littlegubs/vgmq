import { MigrationInterface, QueryRunner } from 'typeorm'

export class LobbyUserLastAnswer1737753501741 implements MigrationInterface {
    name = 'LobbyUserLastAnswer1737753501741'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`lobby_user\` ADD \`lastAnswerAt\` datetime NULL`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`lobby_user\` DROP COLUMN \`lastAnswerAt\``)
    }
}
