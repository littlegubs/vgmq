import { MigrationInterface, QueryRunner } from "typeorm";

export class LobbyResult1745597157888 implements MigrationInterface {
    name = 'LobbyResult1745597157888'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`lobby\` CHANGE \`status\` \`status\` enum ('waiting', 'loading', 'playing', 'buffering', 'playing_music', 'answer_reveal', 'result') NOT NULL DEFAULT 'waiting'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`lobby\` CHANGE \`status\` \`status\` enum ('waiting', 'loading', 'playing', 'buffering', 'playing_music', 'answer_reveal', 'final_standing') NOT NULL DEFAULT 'waiting'`);
    }

}
