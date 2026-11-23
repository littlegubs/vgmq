import { MigrationInterface, QueryRunner } from 'typeorm'

export class LobbyGenreThemeFilter1737747679479 implements MigrationInterface {
    name = 'LobbyGenreThemeFilter1737747679479'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE \`lobby_genre_filter\` (\`id\` int NOT NULL AUTO_INCREMENT, \`type\` enum ('exclusion', 'limitation') NOT NULL DEFAULT 'exclusion', \`limitation\` int NOT NULL, \`genreId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
        )
        await queryRunner.query(
            `CREATE TABLE \`lobby_theme_filter\` (\`id\` int NOT NULL AUTO_INCREMENT, \`type\` enum ('exclusion', 'limitation') NOT NULL DEFAULT 'exclusion', \`limitation\` int NOT NULL, \`themeId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
        )
        await queryRunner.query(
            `CREATE TABLE \`lobby_lobby_genre_filters\` (\`lobbyId\` int NOT NULL, \`lobbyGenreFilterId\` int NOT NULL, INDEX \`IDX_1639758ead675f2f923e4acd3c\` (\`lobbyId\`), INDEX \`IDX_bd2189f5de57fa5a81703b5541\` (\`lobbyGenreFilterId\`), PRIMARY KEY (\`lobbyId\`, \`lobbyGenreFilterId\`)) ENGINE=InnoDB`,
        )
        await queryRunner.query(
            `CREATE TABLE \`lobby_lobby_theme_filters\` (\`lobbyId\` int NOT NULL, \`lobbyThemeFilterId\` int NOT NULL, INDEX \`IDX_ec2886fdc6576b1898d648bb50\` (\`lobbyId\`), INDEX \`IDX_6f8eef3c72cbff07fc927517f9\` (\`lobbyThemeFilterId\`), PRIMARY KEY (\`lobbyId\`, \`lobbyThemeFilterId\`)) ENGINE=InnoDB`,
        )
        await queryRunner.query(
            `ALTER TABLE \`lobby_genre_filter\` ADD CONSTRAINT \`FK_04701a4dbe93206ade10f2588f3\` FOREIGN KEY (\`genreId\`) REFERENCES \`genre\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
        )
        await queryRunner.query(
            `ALTER TABLE \`lobby_theme_filter\` ADD CONSTRAINT \`FK_00c6ffce7a95ad24a40b77ee3a7\` FOREIGN KEY (\`themeId\`) REFERENCES \`theme\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
        )
        await queryRunner.query(
            `ALTER TABLE \`lobby_lobby_genre_filters\` ADD CONSTRAINT \`FK_1639758ead675f2f923e4acd3ca\` FOREIGN KEY (\`lobbyId\`) REFERENCES \`lobby\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
        )
        await queryRunner.query(
            `ALTER TABLE \`lobby_lobby_genre_filters\` ADD CONSTRAINT \`FK_bd2189f5de57fa5a81703b55415\` FOREIGN KEY (\`lobbyGenreFilterId\`) REFERENCES \`lobby_genre_filter\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
        )
        await queryRunner.query(
            `ALTER TABLE \`lobby_lobby_theme_filters\` ADD CONSTRAINT \`FK_ec2886fdc6576b1898d648bb501\` FOREIGN KEY (\`lobbyId\`) REFERENCES \`lobby\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
        )
        await queryRunner.query(
            `ALTER TABLE \`lobby_lobby_theme_filters\` ADD CONSTRAINT \`FK_6f8eef3c72cbff07fc927517f95\` FOREIGN KEY (\`lobbyThemeFilterId\`) REFERENCES \`lobby_theme_filter\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE \`lobby_lobby_theme_filters\` DROP FOREIGN KEY \`FK_6f8eef3c72cbff07fc927517f95\``,
        )
        await queryRunner.query(
            `ALTER TABLE \`lobby_lobby_theme_filters\` DROP FOREIGN KEY \`FK_ec2886fdc6576b1898d648bb501\``,
        )
        await queryRunner.query(
            `ALTER TABLE \`lobby_lobby_genre_filters\` DROP FOREIGN KEY \`FK_bd2189f5de57fa5a81703b55415\``,
        )
        await queryRunner.query(
            `ALTER TABLE \`lobby_lobby_genre_filters\` DROP FOREIGN KEY \`FK_1639758ead675f2f923e4acd3ca\``,
        )
        await queryRunner.query(
            `ALTER TABLE \`lobby_theme_filter\` DROP FOREIGN KEY \`FK_00c6ffce7a95ad24a40b77ee3a7\``,
        )
        await queryRunner.query(
            `ALTER TABLE \`lobby_genre_filter\` DROP FOREIGN KEY \`FK_04701a4dbe93206ade10f2588f3\``,
        )
        await queryRunner.query(
            `DROP INDEX \`IDX_6f8eef3c72cbff07fc927517f9\` ON \`lobby_lobby_theme_filters\``,
        )
        await queryRunner.query(
            `DROP INDEX \`IDX_ec2886fdc6576b1898d648bb50\` ON \`lobby_lobby_theme_filters\``,
        )
        await queryRunner.query(`DROP TABLE \`lobby_lobby_theme_filters\``)
        await queryRunner.query(
            `DROP INDEX \`IDX_bd2189f5de57fa5a81703b5541\` ON \`lobby_lobby_genre_filters\``,
        )
        await queryRunner.query(
            `DROP INDEX \`IDX_1639758ead675f2f923e4acd3c\` ON \`lobby_lobby_genre_filters\``,
        )
        await queryRunner.query(`DROP TABLE \`lobby_lobby_genre_filters\``)
        await queryRunner.query(`DROP TABLE \`lobby_theme_filter\``)
        await queryRunner.query(`DROP TABLE \`lobby_genre_filter\``)
    }
}
