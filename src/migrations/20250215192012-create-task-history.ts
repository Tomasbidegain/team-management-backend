import { QueryInterface, DataTypes } from "sequelize";
import { historyActions } from "../interfaces/enums/historyActions";

export default {
  async up(queryInterface: QueryInterface) {
    await queryInterface.createTable("task_history", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      field: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      old_value: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      new_value: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      action: {
        allowNull: false,
        type: DataTypes.ENUM(...Object.values(historyActions))
      },
      user_id: {
        allowNull: false,
        type: DataTypes.UUID,
        references: {
          model: "users",
          key: "id",
        },
      },
      created_at: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updated_at: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    });
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable("task_history");
  },
};
