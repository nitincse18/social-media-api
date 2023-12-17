import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserSchema1702748797983 implements MigrationInterface {
    name = 'CreateUserSchema1702748797983'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "email" character(128) NOT NULL, "first_name" character(56) NOT NULL, "last_name" character(56) NOT NULL, "mobile" bigint NOT NULL, "image" character varying NOT NULL DEFAULT '', "password" character varying NOT NULL, "dob" date NOT NULL, "gender" character varying NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
