import { MigrationInterface, QueryRunner } from "typeorm";

export class GameAlbumCoverCascade1759670778481 implements MigrationInterface {
    name = 'GameAlbumCoverCascade1759670778481'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`game_album\` DROP FOREIGN KEY \`FK_1ca5b8bcd39a1d815074d349892\``);
        await queryRunner.query(`ALTER TABLE \`game_album\` ADD CONSTRAINT \`FK_1ca5b8bcd39a1d815074d349892\` FOREIGN KEY (\`coverId\`) REFERENCES \`file\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`game_album\` DROP FOREIGN KEY \`FK_1ca5b8bcd39a1d815074d349892\``);
        await queryRunner.query(`ALTER TABLE \`game_album\` ADD CONSTRAINT \`FK_1ca5b8bcd39a1d815074d349892\` FOREIGN KEY (\`coverId\`) REFERENCES \`file\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
