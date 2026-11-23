import { MigrationInterface, QueryRunner } from 'typeorm'

export class GameToMusicDeleted1741523188785 implements MigrationInterface {
    name = 'GameToMusicDeleted1741523188785'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE \`game_to_music\` ADD \`deleted\` tinyint NOT NULL DEFAULT 0`,
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`game_to_music\` DROP COLUMN \`deleted\``)
    }
}
