import { MigrationInterface, QueryRunner } from 'typeorm'

export class GameUpdatedBy1740326066432 implements MigrationInterface {
    name = 'GameUpdatedBy1740326066432'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`game_to_music\` ADD \`updatedById\` int NULL`)
        await queryRunner.query(`ALTER TABLE \`game\` ADD \`updatedById\` int NULL`)
        await queryRunner.query(
            `ALTER TABLE \`game_to_music\` ADD CONSTRAINT \`FK_e6a0c297409dcf0e74c2520a448\` FOREIGN KEY (\`updatedById\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
        )
        await queryRunner.query(
            `ALTER TABLE \`game\` ADD CONSTRAINT \`FK_475414017df081ca013c708fa8d\` FOREIGN KEY (\`updatedById\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE \`game\` DROP FOREIGN KEY \`FK_475414017df081ca013c708fa8d\``,
        )
        await queryRunner.query(
            `ALTER TABLE \`game_to_music\` DROP FOREIGN KEY \`FK_e6a0c297409dcf0e74c2520a448\``,
        )
        await queryRunner.query(`ALTER TABLE \`game\` DROP COLUMN \`updatedById\``)
        await queryRunner.query(`ALTER TABLE \`game_to_music\` DROP COLUMN \`updatedById\``)
    }
}
