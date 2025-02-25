import { QueryInterface } from "sequelize";
import { v4 as uuidv4 } from "uuid";

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    return queryInterface.bulkInsert("task_types", [
      { id: uuidv4(), name: "Desarrollo", created_at: new Date(), updated_at: new Date() },
      { id: uuidv4(), name: "Diseño", created_at: new Date(), updated_at: new Date() },
      { id: uuidv4(), name: "Pruebas", created_at: new Date(), updated_at: new Date() },
      { id: uuidv4(), name: "Investigación", created_at: new Date(), updated_at: new Date() },
      { id: uuidv4(), name: "Documentación", created_at: new Date(), updated_at: new Date() },
    ]);
  },

  down: async (queryInterface: QueryInterface) => {
    return queryInterface.bulkDelete("task_types", {});
  },
};