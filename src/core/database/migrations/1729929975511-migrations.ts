import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1729929975511 implements MigrationInterface {
    name = 'Migrations1729929975511'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "email" character varying(255) NOT NULL, "password" character varying(255) NOT NULL, "balance" numeric(15,2) NOT NULL DEFAULT '0', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "items" ("id" SERIAL NOT NULL, "market_hash_name" character varying(255) NOT NULL, "currency" character varying(255) NOT NULL, "item_page" character varying(255) NOT NULL, "market_page" character varying(255) NOT NULL, "suggested_price" numeric(15,2) NOT NULL DEFAULT '0', "min_price" numeric(15,2) NOT NULL DEFAULT '0', "max_price" numeric(15,2) NOT NULL DEFAULT '0', "mean_price" numeric(15,2) NOT NULL DEFAULT '0', "quantity" integer NOT NULL DEFAULT '0', "created_at" bigint NOT NULL DEFAULT round(EXTRACT(epoch FROM now())), "updated_at" bigint NOT NULL DEFAULT round(EXTRACT(epoch FROM now())), CONSTRAINT "PK_ba5885359424c15ca6b9e79bcf6" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "items"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
