import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateAssignmentsTable1659493145758 implements MigrationInterface {
  name = 'CreateAssignmentsTable1659493145758';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`assignment\` (\`id\` varchar(36) NOT NULL, \`starts_on\` datetime NOT NULL, \`developer_id\` varchar(36) NULL, \`team_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`assignment\` ADD CONSTRAINT \`FK_6d00fc6dcb3ba54a4d9ffb53d07\` FOREIGN KEY (\`developer_id\`) REFERENCES \`developer\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`assignment\` ADD CONSTRAINT \`FK_f9c399d184776b4f40356f7e492\` FOREIGN KEY (\`team_id\`) REFERENCES \`team\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`assignment\` DROP FOREIGN KEY \`FK_f9c399d184776b4f40356f7e492\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`assignment\` DROP FOREIGN KEY \`FK_6d00fc6dcb3ba54a4d9ffb53d07\``,
    );
    await queryRunner.query(`DROP TABLE \`assignment\``);
  }
}
