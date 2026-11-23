import { MigrationInterface, QueryRunner } from "typeorm";

export class LobbyMusicClipPath1791268872907 implements MigrationInterface {
    name = 'LobbyMusicClipPath1791268872907'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`autoVoteSkipAnswerReveal\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`autoVoteSkipGuessing\``);
        await queryRunner.query(`ALTER TABLE \`lobby_music\` ADD \`clipPath\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`lobby_music\` DROP COLUMN \`clipPath\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`autoVoteSkipGuessing\` tinyint NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`autoVoteSkipAnswerReveal\` tinyint NOT NULL DEFAULT '0'`);
    }

}
