import { MigrationInterface, QueryRunner } from "typeorm";

export class UsersRelations1748263498975 implements MigrationInterface {
    name = 'UsersRelations1748263498975'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employees" ADD "user_id" integer`);
        await queryRunner.query(`ALTER TABLE "employees" ADD CONSTRAINT "UQ_2d83c53c3e553a48dadb9722e38" UNIQUE ("user_id")`);
        await queryRunner.query(`ALTER TABLE "superusers" ADD "user_id" integer`);
        await queryRunner.query(`ALTER TABLE "superusers" ADD CONSTRAINT "UQ_22deaebbce2a59199a533d48aee" UNIQUE ("user_id")`);
        await queryRunner.query(`ALTER TABLE "employees" ADD CONSTRAINT "FK_2d83c53c3e553a48dadb9722e38" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "superusers" ADD CONSTRAINT "FK_22deaebbce2a59199a533d48aee" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "superusers" DROP CONSTRAINT "FK_22deaebbce2a59199a533d48aee"`);
        await queryRunner.query(`ALTER TABLE "employees" DROP CONSTRAINT "FK_2d83c53c3e553a48dadb9722e38"`);
        await queryRunner.query(`ALTER TABLE "superusers" DROP CONSTRAINT "UQ_22deaebbce2a59199a533d48aee"`);
        await queryRunner.query(`ALTER TABLE "superusers" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "employees" DROP CONSTRAINT "UQ_2d83c53c3e553a48dadb9722e38"`);
        await queryRunner.query(`ALTER TABLE "employees" DROP COLUMN "user_id"`);
    }

}
