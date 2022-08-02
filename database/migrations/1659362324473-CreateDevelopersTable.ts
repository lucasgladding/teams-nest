import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateDevelopersTable1659362324473 implements MigrationInterface {
  name = 'CreateDevelopersTable1659362324473';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`developer\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`developer\``);
  }
}
