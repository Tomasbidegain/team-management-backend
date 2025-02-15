import { QueryInterface, DataTypes } from "sequelize";

export default {
  async up(queryInterface: QueryInterface) {
    await queryInterface.createTable("user_projects", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
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
      role_id: {
        allowNull: false,
        type: DataTypes.UUID,
        references: {
          model: "project_roles",
          key: "id",
        },
      },
    });
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable("user_projects");
  },
};
