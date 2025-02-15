import { QueryInterface, DataTypes } from "sequelize";

export default {
  async up(queryInterface: QueryInterface) {
    await queryInterface.createTable("projects", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      description: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      start_date: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      end_date: {
        type: DataTypes.DATE,
      },
      state_id: {
        allowNull: false,
        type: DataTypes.UUID,
        references: {
          model: "project_states",
          key: "id",
        },
      },
      type_id: {
        allowNull: false,
        type: DataTypes.UUID,
        references: {
          model: "project_types",
          key: "id",
        },
      },
    });
  },
  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable("projects");
  },
};
