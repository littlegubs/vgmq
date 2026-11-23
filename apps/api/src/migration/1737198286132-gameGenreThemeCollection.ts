import { MigrationInterface, QueryRunner } from 'typeorm'

export class GameGenreThemeCollection1737198286132 implements MigrationInterface {
    name = 'GameGenreThemeCollection1737198286132'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE \`collection\` (\`id\` int NOT NULL AUTO_INCREMENT, \`igdbId\` int NOT NULL, \`name\` varchar(255) NOT NULL, \`slug\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_e95cd225beb9d1c8632095af3b\` (\`igdbId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
        )
        await queryRunner.query(
            `CREATE TABLE \`genre\` (\`id\` int NOT NULL AUTO_INCREMENT, \`igdbId\` int NOT NULL, \`name\` varchar(255) NOT NULL, \`slug\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_e51c5968e7af4e9d25ea428394\` (\`igdbId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
        )
        await queryRunner.query(
            `CREATE TABLE \`theme\` (\`id\` int NOT NULL AUTO_INCREMENT, \`igdbId\` int NOT NULL, \`name\` varchar(255) NOT NULL, \`slug\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_674b2de001efc4c015cc3c12f9\` (\`igdbId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
        )
        await queryRunner.query(
            `CREATE TABLE \`games_genres\` (\`gameId\` int NOT NULL, \`genreId\` int NOT NULL, INDEX \`IDX_6259abc6052a52223ea9bf2866\` (\`gameId\`), INDEX \`IDX_dd94648037901ccf5b281edc9c\` (\`genreId\`), PRIMARY KEY (\`gameId\`, \`genreId\`)) ENGINE=InnoDB`,
        )
        await queryRunner.query(
            `CREATE TABLE \`games_themes\` (\`gameId\` int NOT NULL, \`themeId\` int NOT NULL, INDEX \`IDX_e36f95c1191814f3b3266c6273\` (\`gameId\`), INDEX \`IDX_18feda7e1f10d002811e26e9b3\` (\`themeId\`), PRIMARY KEY (\`gameId\`, \`themeId\`)) ENGINE=InnoDB`,
        )
        await queryRunner.query(
            `CREATE TABLE \`games_collections\` (\`gameId\` int NOT NULL, \`collectionId\` int NOT NULL, INDEX \`IDX_053615f3b6f3a15aa71c5d9f0d\` (\`gameId\`), INDEX \`IDX_2a2cc6beb88f2d62011b2e51a1\` (\`collectionId\`), PRIMARY KEY (\`gameId\`, \`collectionId\`)) ENGINE=InnoDB`,
        )
        await queryRunner.query(
            `ALTER TABLE \`games_genres\` ADD CONSTRAINT \`FK_6259abc6052a52223ea9bf2866c\` FOREIGN KEY (\`gameId\`) REFERENCES \`game\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
        )
        await queryRunner.query(
            `ALTER TABLE \`games_genres\` ADD CONSTRAINT \`FK_dd94648037901ccf5b281edc9c1\` FOREIGN KEY (\`genreId\`) REFERENCES \`genre\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
        )
        await queryRunner.query(
            `ALTER TABLE \`games_themes\` ADD CONSTRAINT \`FK_e36f95c1191814f3b3266c6273b\` FOREIGN KEY (\`gameId\`) REFERENCES \`game\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
        )
        await queryRunner.query(
            `ALTER TABLE \`games_themes\` ADD CONSTRAINT \`FK_18feda7e1f10d002811e26e9b38\` FOREIGN KEY (\`themeId\`) REFERENCES \`theme\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
        )
        await queryRunner.query(
            `ALTER TABLE \`games_collections\` ADD CONSTRAINT \`FK_053615f3b6f3a15aa71c5d9f0d7\` FOREIGN KEY (\`gameId\`) REFERENCES \`game\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
        )
        await queryRunner.query(
            `ALTER TABLE \`games_collections\` ADD CONSTRAINT \`FK_2a2cc6beb88f2d62011b2e51a1b\` FOREIGN KEY (\`collectionId\`) REFERENCES \`collection\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE \`games_collections\` DROP FOREIGN KEY \`FK_2a2cc6beb88f2d62011b2e51a1b\``,
        )
        await queryRunner.query(
            `ALTER TABLE \`games_collections\` DROP FOREIGN KEY \`FK_053615f3b6f3a15aa71c5d9f0d7\``,
        )
        await queryRunner.query(
            `ALTER TABLE \`games_themes\` DROP FOREIGN KEY \`FK_18feda7e1f10d002811e26e9b38\``,
        )
        await queryRunner.query(
            `ALTER TABLE \`games_themes\` DROP FOREIGN KEY \`FK_e36f95c1191814f3b3266c6273b\``,
        )
        await queryRunner.query(
            `ALTER TABLE \`games_genres\` DROP FOREIGN KEY \`FK_dd94648037901ccf5b281edc9c1\``,
        )
        await queryRunner.query(
            `ALTER TABLE \`games_genres\` DROP FOREIGN KEY \`FK_6259abc6052a52223ea9bf2866c\``,
        )
        await queryRunner.query(
            `DROP INDEX \`IDX_2a2cc6beb88f2d62011b2e51a1\` ON \`games_collections\``,
        )
        await queryRunner.query(
            `DROP INDEX \`IDX_053615f3b6f3a15aa71c5d9f0d\` ON \`games_collections\``,
        )
        await queryRunner.query(`DROP TABLE \`games_collections\``)
        await queryRunner.query(`DROP INDEX \`IDX_18feda7e1f10d002811e26e9b3\` ON \`games_themes\``)
        await queryRunner.query(`DROP INDEX \`IDX_e36f95c1191814f3b3266c6273\` ON \`games_themes\``)
        await queryRunner.query(`DROP TABLE \`games_themes\``)
        await queryRunner.query(`DROP INDEX \`IDX_dd94648037901ccf5b281edc9c\` ON \`games_genres\``)
        await queryRunner.query(`DROP INDEX \`IDX_6259abc6052a52223ea9bf2866\` ON \`games_genres\``)
        await queryRunner.query(`DROP TABLE \`games_genres\``)
        await queryRunner.query(`DROP INDEX \`IDX_674b2de001efc4c015cc3c12f9\` ON \`theme\``)
        await queryRunner.query(`DROP TABLE \`theme\``)
        await queryRunner.query(`DROP INDEX \`IDX_e51c5968e7af4e9d25ea428394\` ON \`genre\``)
        await queryRunner.query(`DROP TABLE \`genre\``)
        await queryRunner.query(`DROP INDEX \`IDX_e95cd225beb9d1c8632095af3b\` ON \`collection\``)
        await queryRunner.query(`DROP TABLE \`collection\``)
    }
}
