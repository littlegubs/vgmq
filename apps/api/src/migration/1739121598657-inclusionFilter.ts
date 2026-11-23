import { MigrationInterface, QueryRunner } from 'typeorm'

export class InclusionFilter1739121598657 implements MigrationInterface {
    name = 'InclusionFilter1739121598657'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE \`lobby_collection_filter\` CHANGE \`type\` \`type\` enum ('exclusion', 'limitation', 'inclusion') NOT NULL DEFAULT 'exclusion'`,
        )
        await queryRunner.query(
            `ALTER TABLE \`lobby_genre_filter\` CHANGE \`type\` \`type\` enum ('exclusion', 'limitation', 'inclusion') NOT NULL DEFAULT 'exclusion'`,
        )
        await queryRunner.query(
            `ALTER TABLE \`lobby_theme_filter\` CHANGE \`type\` \`type\` enum ('exclusion', 'limitation', 'inclusion') NOT NULL DEFAULT 'exclusion'`,
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE \`lobby_theme_filter\` CHANGE \`type\` \`type\` enum ('exclusion', 'limitation') NOT NULL DEFAULT 'exclusion'`,
        )
        await queryRunner.query(
            `ALTER TABLE \`lobby_genre_filter\` CHANGE \`type\` \`type\` enum ('exclusion', 'limitation') NOT NULL DEFAULT 'exclusion'`,
        )
        await queryRunner.query(
            `ALTER TABLE \`lobby_collection_filter\` CHANGE \`type\` \`type\` enum ('exclusion', 'limitation') NOT NULL DEFAULT 'exclusion'`,
        )
    }
}
