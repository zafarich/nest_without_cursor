import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPermissionGroup1748262998229 implements MigrationInterface {
    name = 'AddPermissionGroup1748262998229'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "permissions" RENAME COLUMN "description2" TO "description"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "permissions" RENAME COLUMN "description" TO "description2"`);
    }

}
