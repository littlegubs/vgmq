import { MigrationInterface, QueryRunner } from 'typeorm'

export class LobbyBannedUsers1782845145577 implements MigrationInterface {
    name = 'LobbyBannedUsers1782845145577'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE \`lobby_banned_users\` (\`lobbyId\` int NOT NULL, \`userId\` int NOT NULL, INDEX \`IDX_ba03cbc603b4ab3199144a2699\` (\`lobbyId\`), INDEX \`IDX_9c474f0e064991284717c5fbdd\` (\`userId\`), PRIMARY KEY (\`lobbyId\`, \`userId\`)) ENGINE=InnoDB`,
        )
        await queryRunner.query(
            `ALTER TABLE \`lobby_banned_users\` ADD CONSTRAINT \`FK_ba03cbc603b4ab3199144a26991\` FOREIGN KEY (\`lobbyId\`) REFERENCES \`lobby\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
        )
        await queryRunner.query(
            `ALTER TABLE \`lobby_banned_users\` ADD CONSTRAINT \`FK_9c474f0e064991284717c5fbdd3\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE \`lobby_banned_users\` DROP FOREIGN KEY \`FK_9c474f0e064991284717c5fbdd3\``,
        )
        await queryRunner.query(
            `ALTER TABLE \`lobby_banned_users\` DROP FOREIGN KEY \`FK_ba03cbc603b4ab3199144a26991\``,
        )
        await queryRunner.query(
            `DROP INDEX \`IDX_9c474f0e064991284717c5fbdd\` ON \`lobby_banned_users\``,
        )
        await queryRunner.query(
            `DROP INDEX \`IDX_ba03cbc603b4ab3199144a2699\` ON \`lobby_banned_users\``,
        )
        await queryRunner.query(`DROP TABLE \`lobby_banned_users\``)
    }
}
