import { MigrationInterface, QueryRunner } from 'typeorm'

export class Patreon1735136627095 implements MigrationInterface {
    name = 'Patreon1735136627095'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE \`oauth_patreon\` (\`id\` int NOT NULL AUTO_INCREMENT, \`accessToken\` varchar(255) NOT NULL, \`refreshToken\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
        )
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`patreonAccountId\` int NULL`)
        await queryRunner.query(
            `ALTER TABLE \`user\` ADD UNIQUE INDEX \`IDX_a7630206e221fd111d5ff02ff9\` (\`patreonAccountId\`)`,
        )
        await queryRunner.query(
            `CREATE UNIQUE INDEX \`REL_a7630206e221fd111d5ff02ff9\` ON \`user\` (\`patreonAccountId\`)`,
        )
        await queryRunner.query(
            `ALTER TABLE \`user\` ADD CONSTRAINT \`FK_a7630206e221fd111d5ff02ff9c\` FOREIGN KEY (\`patreonAccountId\`) REFERENCES \`oauth_patreon\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`,
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_a7630206e221fd111d5ff02ff9c\``,
        )
        await queryRunner.query(`DROP INDEX \`REL_a7630206e221fd111d5ff02ff9\` ON \`user\``)
        await queryRunner.query(
            `ALTER TABLE \`user\` DROP INDEX \`IDX_a7630206e221fd111d5ff02ff9\``,
        )
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`patreonAccountId\``)
        await queryRunner.query(`DROP TABLE \`oauth_patreon\``)
    }
}
