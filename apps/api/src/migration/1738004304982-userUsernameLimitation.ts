import { MigrationInterface, QueryRunner } from 'typeorm'

export class UserUsernameLimitation1738004304982 implements MigrationInterface {
    name = 'UserUsernameLimitation1738004304982'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`usernameUpdatedAt\` datetime NULL`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`usernameUpdatedAt\``)
    }
}
