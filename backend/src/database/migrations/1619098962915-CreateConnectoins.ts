import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateConnectoins1619098962915 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: "connections",
          columns: [
            {
              name: "id",
              type: "uuid",
              isPrimary: true
            },
            {
              name: "admin_id",
              type: "uuid",
              isNullable: true
            },
            {
              name: "user_id",
              type: "uuid"
            },
            {
              name: "created_at",
              type: "timestamp",
              default: "now()"
            },
            {
              name: "updated_at",
              type: "timestamp",
              default: "now()"
            },
            {
              name: "socket_id",
              type: "varchar"
            }
          ],
          foreignKeys: [
            {
              name: "FkUser",
              referencedTableName: "users",
              referencedColumnNames: ["id"],
              columnNames: ["user_id"],
              onDelete: "SET NULL",
              onUpdate: "SET NULL"
            }
          ]
        })
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable("connections")
    }

}
