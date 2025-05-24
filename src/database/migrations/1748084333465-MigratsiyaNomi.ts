import { MigrationInterface, QueryRunner } from "typeorm";

export class MigratsiyaNomi1748084333465 implements MigrationInterface {
    name = 'MigratsiyaNomi1748084333465'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "categories" RENAME COLUMN "name" TO "name22"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "categories" RENAME COLUMN "name22" TO "name"`);
    }

}
