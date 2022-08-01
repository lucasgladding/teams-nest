import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateAssignmentsTable1659375136583 implements MigrationInterface {
  name = 'CreateAssignmentsTable1659375136583';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`assignment\` (\`id\` varchar(36) NOT NULL, \`developer_id\` varchar(255) NOT NULL, \`team_id\` varchar(255) NOT NULL, \`starts_on\` datetime NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`assignment\``);
  }
}
