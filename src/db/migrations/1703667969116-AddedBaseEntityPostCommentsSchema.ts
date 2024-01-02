import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedBaseEntityPostCommentsSchema1703667969116 implements MigrationInterface {
    name = 'AddedBaseEntityPostCommentsSchema1703667969116'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts" ADD "createdBy" character(128) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "posts" ADD "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "posts" ADD "updatedBy" character(128)`);
        await queryRunner.query(`ALTER TABLE "posts" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "posts" ADD "deletedBy" character(128)`);
        await queryRunner.query(`ALTER TABLE "posts" ADD "deletedAt" TIMESTAMP WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "comments" ADD "createdBy" character(128) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "comments" ADD "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "comments" ADD "updatedBy" character(128)`);
        await queryRunner.query(`ALTER TABLE "comments" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "comments" ADD "deletedBy" character(128)`);
        await queryRunner.query(`ALTER TABLE "comments" ADD "deletedAt" TIMESTAMP WITH TIME ZONE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comments" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP COLUMN "deletedBy"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP COLUMN "updatedBy"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP COLUMN "createAt"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP COLUMN "createdBy"`);
        await queryRunner.query(`ALTER TABLE "posts" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "posts" DROP COLUMN "deletedBy"`);
        await queryRunner.query(`ALTER TABLE "posts" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "posts" DROP COLUMN "updatedBy"`);
        await queryRunner.query(`ALTER TABLE "posts" DROP COLUMN "createAt"`);
        await queryRunner.query(`ALTER TABLE "posts" DROP COLUMN "createdBy"`);
    }

}
