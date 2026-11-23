import { MigrationInterface, QueryRunner } from 'typeorm'

export class Patreon31735314486944 implements MigrationInterface {
    name = 'Patreon31735314486944'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_a7630206e221fd111d5ff02ff9c\``,
        )
        await queryRunner.query(`DROP INDEX \`REL_a7630206e221fd111d5ff02ff9\` ON \`user\``)
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`patreonAccountId\``)
        await queryRunner.query(`ALTER TABLE \`oauth_patreon\` ADD \`userId\` int NULL`)
        await queryRunner.query(
            `ALTER TABLE \`oauth_patreon\` ADD UNIQUE INDEX \`IDX_e829df2498cc816681407a55a0\` (\`userId\`)`,
        )
        await queryRunner.query(
            `CREATE UNIQUE INDEX \`REL_e829df2498cc816681407a55a0\` ON \`oauth_patreon\` (\`userId\`)`,
        )
        await queryRunner.query(
            `ALTER TABLE \`oauth_patreon\` ADD CONSTRAINT \`FK_e829df2498cc816681407a55a03\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE \`oauth_patreon\` DROP FOREIGN KEY \`FK_e829df2498cc816681407a55a03\``,
        )
        await queryRunner.query(
            `DROP INDEX \`REL_e829df2498cc816681407a55a0\` ON \`oauth_patreon\``,
        )
        await queryRunner.query(
            `ALTER TABLE \`oauth_patreon\` DROP INDEX \`IDX_e829df2498cc816681407a55a0\``,
        )
        await queryRunner.query(`ALTER TABLE \`oauth_patreon\` DROP COLUMN \`userId\``)
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`patreonAccountId\` int NULL`)
        await queryRunner.query(
            `CREATE UNIQUE INDEX \`REL_a7630206e221fd111d5ff02ff9\` ON \`user\` (\`patreonAccountId\`)`,
        )
        await queryRunner.query(
            `ALTER TABLE \`user\` ADD CONSTRAINT \`FK_a7630206e221fd111d5ff02ff9c\` FOREIGN KEY (\`patreonAccountId\`) REFERENCES \`oauth_patreon\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`,
        )
    }
}
