import { MigrationInterface, QueryRunner } from "typeorm";

export class GameType21758198460571 implements MigrationInterface {
    name = 'GameType21758198460571'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`game\` DROP COLUMN \`category\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`game\` ADD \`category\` int NOT NULL`);
    }

}
