import { QueryInterface, DataTypes } from "sequelize";

export default {
  async up(queryInterface: QueryInterface) {
    await queryInterface.createTable("project_history", {
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
      changed_at: {
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
      },
      project_id: {
        allowNull: false,
        type: DataTypes.UUID,
        references: {
          model: "projects",
          key: "id",
        },
      },
    });
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable("project_history");
  },
};
