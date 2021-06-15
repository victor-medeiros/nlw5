import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateMessages1619011852700 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: "messages",
          columns: [
            {
              name: "id",
              type: "uuid",
              isPrimary: true
            },
            {
              name: "admin_id",
              type: "uuid",
              isNullable:  true
            },
            {
              name: "user_id",
              type: "uuid"
            },
            {
              name: "text",
              type: "varchar"
            },
            {
              name: "created_at",
              type: "timestamp",
              default: "now()"
            }
          ],
          foreignKeys: [
            {
              referencedTableName: "users",
              referencedColumnNames: ["id"],
              columnNames: ["user_id"],
              name: "FKUser",
              onDelete: "SET NULL",
              onUpdate: "SET NULL"
            }
          ]
        })
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable("messages")
    }

}
