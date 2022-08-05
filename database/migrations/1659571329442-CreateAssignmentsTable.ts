import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateAssignmentsTable1659571329442 implements MigrationInterface {
  name = 'CreateAssignmentsTable1659571329442';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`assignment\` (\`id\` varchar(36) NOT NULL, \`starts_on\` datetime(6) NOT NULL, \`developer_id\` varchar(255) NOT NULL, \`team_id\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`assignment\` ADD CONSTRAINT \`FK_6d00fc6dcb3ba54a4d9ffb53d07\` FOREIGN KEY (\`developer_id\`) REFERENCES \`developer\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`assignment\` ADD CONSTRAINT \`FK_f9c399d184776b4f40356f7e492\` FOREIGN KEY (\`team_id\`) REFERENCES \`team\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`assignment\``);
  }
}
