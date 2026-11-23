import { MigrationInterface, QueryRunner } from "typeorm";

export class LobbyMusicStartedAt1746537123412 implements MigrationInterface {
    name = 'LobbyMusicStartedAt1746537123412'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`lobby_music\` ADD \`musicStartedPlayingAt\` datetime(3) NULL`);
        await queryRunner.query(`ALTER TABLE \`lobby_music\` CHANGE \`musicFinishPlayingAt\` \`musicFinishPlayingAt\` datetime(3) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`lobby_music\` CHANGE \`musicFinishPlayingAt\` \`musicFinishPlayingAt\` datetime(0) NULL`);
        await queryRunner.query(`ALTER TABLE \`lobby_music\` DROP COLUMN \`musicStartedPlayingAt\``);
    }

}
