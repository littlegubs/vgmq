import { MigrationInterface, QueryRunner } from 'typeorm'

export class UserPremiumCachedAt1738180218742 implements MigrationInterface {
    name = 'UserPremiumCachedAt1738180218742'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`premium\` tinyint NOT NULL DEFAULT 0`)
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`premiumCachedAt\` datetime NULL`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`premiumCachedAt\``)
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`premium\``)
    }
}
