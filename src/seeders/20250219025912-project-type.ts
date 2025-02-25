import { QueryInterface } from "sequelize";
import { v4 as uuidv4 } from "uuid";

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    return queryInterface.bulkInsert("project_types", [
      { id: uuidv4(), name: "Desarrollo de software", created_at: new Date(), updated_at: new Date()},
      { id: uuidv4(), name: "Marketing", created_at: new Date(), updated_at: new Date() },
      { id: uuidv4(), name: "Investigación", created_at: new Date(), updated_at: new Date() },
      { id: uuidv4(), name: "Consultoria", created_at: new Date(), updated_at: new Date() },
    ]);
  },

  down: async (queryInterface: QueryInterface) => {
    return queryInterface.bulkDelete("project_types", {});
  },
};
