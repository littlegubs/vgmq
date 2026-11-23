import { MigrationInterface, QueryRunner } from "typeorm";

export class GameType1758195563015 implements MigrationInterface {
    name = 'GameType1758195563015'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`game_type\` (\`id\` int NOT NULL AUTO_INCREMENT, \`igdbId\` int NOT NULL, \`type\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_e41cfb23e8d874eb083905e0cf\` (\`igdbId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`game\` ADD \`typeId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`game\` ADD CONSTRAINT \`FK_656fb2fda95e84787d46ec49a74\` FOREIGN KEY (\`typeId\`) REFERENCES \`game_type\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`game\` DROP FOREIGN KEY \`FK_656fb2fda95e84787d46ec49a74\``);
        await queryRunner.query(`ALTER TABLE \`game\` DROP COLUMN \`typeId\``);
        await queryRunner.query(`DROP INDEX \`IDX_e41cfb23e8d874eb083905e0cf\` ON \`game_type\``);
        await queryRunner.query(`DROP TABLE \`game_type\``);
    }

}
