import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedCoverImageInUserSchema1704301396892 implements MigrationInterface {
    name = 'AddedCoverImageInUserSchema1704301396892'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "cover_image" character varying NOT NULL DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "cover_image"`);
    }

}
