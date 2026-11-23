import { MigrationInterface, QueryRunner } from 'typeorm'

export class MusicArtistTextColumn1744828010948 implements MigrationInterface {
    name = 'MusicArtistTextColumn1744828010948'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE \`game_to_music\` CHANGE \`artist\` \`artist\` TEXT DEFAULT NULL;`,
        )
        await queryRunner.query(
            `ALTER TABLE \`music\` CHANGE \`artist\` \`artist\` TEXT DEFAULT NULL;`,
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE \`game_to_music\` CHANGE \`artist\` \`artist\` varchar(255) DEFAULT NULL;`,
        )
        await queryRunner.query(
            `ALTER TABLE \`music\` CHANGE \`artist\` \`artist\` varchar(255) DEFAULT NULL;`,
        )
    }
}
