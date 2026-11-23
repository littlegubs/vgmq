import { MigrationInterface, QueryRunner } from 'typeorm'

export class Patreon41735391638766 implements MigrationInterface {
    name = 'Patreon41735391638766'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `DROP INDEX \`IDX_e829df2498cc816681407a55a0\` ON \`oauth_patreon\``,
        )
        await queryRunner.query(
            `ALTER TABLE \`oauth_patreon\` ADD \`campaignLifetimeSupportCents\` int NOT NULL DEFAULT '0'`,
        )
        await queryRunner.query(
            `ALTER TABLE \`oauth_patreon\` ADD \`currentlyEntitledTiers\` text NOT NULL`,
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE \`oauth_patreon\` DROP COLUMN \`currentlyEntitledTiers\``,
        )
        await queryRunner.query(
            `ALTER TABLE \`oauth_patreon\` DROP COLUMN \`campaignLifetimeSupportCents\``,
        )
        await queryRunner.query(
            `CREATE UNIQUE INDEX \`IDX_e829df2498cc816681407a55a0\` ON \`oauth_patreon\` (\`userId\`)`,
        )
    }
}
