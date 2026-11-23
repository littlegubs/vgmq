import { MigrationInterface, QueryRunner } from 'typeorm'

export class Patreon21735304252896 implements MigrationInterface {
    name = 'Patreon21735304252896'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_a7630206e221fd111d5ff02ff9\` ON \`user\``)
        await queryRunner.query(
            `ALTER TABLE \`oauth_patreon\` ADD \`patreonUserId\` varchar(255) NOT NULL`,
        )
        await queryRunner.query(
            `ALTER TABLE \`oauth_patreon\` ADD UNIQUE INDEX \`IDX_2dc200bc4f810612ce4344c108\` (\`patreonUserId\`)`,
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE \`oauth_patreon\` DROP INDEX \`IDX_2dc200bc4f810612ce4344c108\``,
        )
        await queryRunner.query(`ALTER TABLE \`oauth_patreon\` DROP COLUMN \`patreonUserId\``)
        await queryRunner.query(
            `CREATE UNIQUE INDEX \`IDX_a7630206e221fd111d5ff02ff9\` ON \`user\` (\`patreonAccountId\`)`,
        )
    }
}
