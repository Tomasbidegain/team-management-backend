import { QueryInterface, DataTypes } from "sequelize";

export default {
  async up(queryInterface: QueryInterface) {
    await queryInterface.createTable("task_users", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      assigned_at: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      user_id: {
        allowNull: false,
        type: DataTypes.UUID,
        references: {
          model: "users",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      task_id: {
        allowNull: false,
        type: DataTypes.UUID,
        references: {
          model: "tasks",
          key: "id",
        },
      },
    });
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable("task_users");
  },
};
