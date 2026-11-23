import { MigrationInterface, QueryRunner } from "typeorm";

export class PauseLobby1774095965623 implements MigrationInterface {
    name = 'PauseLobby1774095965623'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`lobby\` ADD \`isPaused\` tinyint NOT NULL DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE \`lobby\` ADD \`pausedJobName\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`lobby\` ADD \`pausedJobRemainingDelay\` int NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`lobby\` DROP COLUMN \`pausedJobRemainingDelay\``);
        await queryRunner.query(`ALTER TABLE \`lobby\` DROP COLUMN \`pausedJobName\``);
        await queryRunner.query(`ALTER TABLE \`lobby\` DROP COLUMN \`isPaused\``);
    }

}
