import { MigrationInterface, QueryRunner } from "typeorm";

export class LobbyMusicLoaded1767369541479 implements MigrationInterface {
    name = 'LobbyMusicLoaded1767369541479'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`lobby_music\` ADD \`loaded\` tinyint NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`lobby_music\` DROP COLUMN \`loaded\``);
    }

}
