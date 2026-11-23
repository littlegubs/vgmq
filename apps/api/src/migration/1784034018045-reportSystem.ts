import { MigrationInterface, QueryRunner } from "typeorm";

export class ReportSystem1784034018045 implements MigrationInterface {
    name = 'ReportSystem1784034018045'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`lobby_report\` (\`id\` int NOT NULL AUTO_INCREMENT, \`lobbyId\` int NOT NULL, \`status\` enum ('pending', 'banned', 'denied') NOT NULL DEFAULT 'pending', \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`reporterId\` int NULL, \`reportedId\` int NULL, \`updatedById\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`lobby_message\` (\`id\` int NOT NULL AUTO_INCREMENT, \`content\` varchar(255) NOT NULL, \`lobbyId\` int NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`lobby_report\` ADD CONSTRAINT \`FK_1d84f64a4d1495872065f58ce37\` FOREIGN KEY (\`reporterId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`lobby_report\` ADD CONSTRAINT \`FK_54443b5bd89a20e62605032fde0\` FOREIGN KEY (\`reportedId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`lobby_report\` ADD CONSTRAINT \`FK_2940926d62b59374a162af42d5b\` FOREIGN KEY (\`updatedById\`) REFERENCES \`user\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`lobby_message\` ADD CONSTRAINT \`FK_f708ac785a7dd9b226333305dfa\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`lobby_message\` DROP FOREIGN KEY \`FK_f708ac785a7dd9b226333305dfa\``);
        await queryRunner.query(`ALTER TABLE \`lobby_report\` DROP FOREIGN KEY \`FK_2940926d62b59374a162af42d5b\``);
        await queryRunner.query(`ALTER TABLE \`lobby_report\` DROP FOREIGN KEY \`FK_54443b5bd89a20e62605032fde0\``);
        await queryRunner.query(`ALTER TABLE \`lobby_report\` DROP FOREIGN KEY \`FK_1d84f64a4d1495872065f58ce37\``);
        await queryRunner.query(`DROP TABLE \`lobby_message\``);
        await queryRunner.query(`DROP TABLE \`lobby_report\``);
    }

}
