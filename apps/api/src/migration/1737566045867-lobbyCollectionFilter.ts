import { MigrationInterface, QueryRunner } from 'typeorm'

export class LobbyCollectionFilter1737566045867 implements MigrationInterface {
    name = 'LobbyCollectionFilter1737566045867'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE \`lobby_collection_filter\` (\`id\` int NOT NULL AUTO_INCREMENT, \`type\` enum ('exclusion', 'limitation') NOT NULL DEFAULT 'exclusion', \`limitation\` int NOT NULL, \`collectionId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
        )
        await queryRunner.query(
            `CREATE TABLE \`lobby_lobby_collection_filters\` (\`lobbyId\` int NOT NULL, \`lobbyCollectionFilterId\` int NOT NULL, INDEX \`IDX_543f6130a4798ae83cca98366c\` (\`lobbyId\`), INDEX \`IDX_857b8503d09f80167d9a2a4903\` (\`lobbyCollectionFilterId\`), PRIMARY KEY (\`lobbyId\`, \`lobbyCollectionFilterId\`)) ENGINE=InnoDB`,
        )
        await queryRunner.query(
            `ALTER TABLE \`lobby_collection_filter\` ADD CONSTRAINT \`FK_6445d5598c76891b294bcd5fe73\` FOREIGN KEY (\`collectionId\`) REFERENCES \`collection\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
        )
        await queryRunner.query(
            `ALTER TABLE \`lobby_lobby_collection_filters\` ADD CONSTRAINT \`FK_543f6130a4798ae83cca98366c9\` FOREIGN KEY (\`lobbyId\`) REFERENCES \`lobby\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
        )
        await queryRunner.query(
            `ALTER TABLE \`lobby_lobby_collection_filters\` ADD CONSTRAINT \`FK_857b8503d09f80167d9a2a49033\` FOREIGN KEY (\`lobbyCollectionFilterId\`) REFERENCES \`lobby_collection_filter\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE \`lobby_lobby_collection_filters\` DROP FOREIGN KEY \`FK_857b8503d09f80167d9a2a49033\``,
        )
        await queryRunner.query(
            `ALTER TABLE \`lobby_lobby_collection_filters\` DROP FOREIGN KEY \`FK_543f6130a4798ae83cca98366c9\``,
        )
        await queryRunner.query(
            `ALTER TABLE \`lobby_collection_filter\` DROP FOREIGN KEY \`FK_6445d5598c76891b294bcd5fe73\``,
        )
        await queryRunner.query(
            `DROP INDEX \`IDX_857b8503d09f80167d9a2a4903\` ON \`lobby_lobby_collection_filters\``,
        )
        await queryRunner.query(
            `DROP INDEX \`IDX_543f6130a4798ae83cca98366c\` ON \`lobby_lobby_collection_filters\``,
        )
        await queryRunner.query(`DROP TABLE \`lobby_lobby_collection_filters\``)
        await queryRunner.query(`DROP TABLE \`lobby_collection_filter\``)
    }
}
