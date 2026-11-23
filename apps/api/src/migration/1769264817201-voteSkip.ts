import { MigrationInterface, QueryRunner } from "typeorm";

export class VoteSkip1769264817201 implements MigrationInterface {
    name = 'VoteSkip1769264817201'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`lobby_user\` ADD \`voteSkip\` tinyint NOT NULL DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE \`lobby\` ADD \`allowVoteSkipGuessing\` tinyint NOT NULL DEFAULT 1`);
        await queryRunner.query(`ALTER TABLE \`lobby\` ADD \`allowVoteSkipAnswerReveal\` tinyint NOT NULL DEFAULT 1`);
        await queryRunner.query(`ALTER TABLE \`lobby\` ADD \`voteSkip\` int NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`autoVoteSkipGuessing\` tinyint NOT NULL DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`autoVoteSkipAnswerReveal\` tinyint NOT NULL DEFAULT 0`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`autoVoteSkipAnswerReveal\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`autoVoteSkipGuessing\``);
        await queryRunner.query(`ALTER TABLE \`lobby\` DROP COLUMN \`voteSkip\``);
        await queryRunner.query(`ALTER TABLE \`lobby\` DROP COLUMN \`allowVoteSkipAnswerReveal\``);
        await queryRunner.query(`ALTER TABLE \`lobby\` DROP COLUMN \`allowVoteSkipGuessing\``);
        await queryRunner.query(`ALTER TABLE \`lobby_user\` DROP COLUMN \`voteSkip\``);
    }

}
