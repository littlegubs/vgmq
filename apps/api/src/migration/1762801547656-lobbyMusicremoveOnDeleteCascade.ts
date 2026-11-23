import { MigrationInterface, QueryRunner } from "typeorm";

export class LobbyMusicremoveOnDeleteCascade1762801547656 implements MigrationInterface {
    name = 'LobbyMusicremoveOnDeleteCascade1762801547656'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`lobby_music\` DROP FOREIGN KEY \`FK_a4e486c222150a7e95ba71a4ec3\``);
        await queryRunner.query(`ALTER TABLE \`lobby_music\` ADD CONSTRAINT \`FK_a4e486c222150a7e95ba71a4ec3\` FOREIGN KEY (\`lobbyId\`) REFERENCES \`lobby\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`lobby_music\` DROP FOREIGN KEY \`FK_a4e486c222150a7e95ba71a4ec3\``);
        await queryRunner.query(`ALTER TABLE \`lobby_music\` ADD CONSTRAINT \`FK_a4e486c222150a7e95ba71a4ec3\` FOREIGN KEY (\`lobbyId\`) REFERENCES \`lobby\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
