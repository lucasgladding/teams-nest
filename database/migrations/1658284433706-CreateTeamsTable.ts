import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTeamsTable1658284433706 implements MigrationInterface {
  name = 'CreateTeamsTable1658284433706';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`team\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`team\``);
  }
}
