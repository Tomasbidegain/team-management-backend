import { QueryInterface } from "sequelize";
import { v4 as uuidv4 } from "uuid";

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    return queryInterface.bulkInsert("roles", [
      { id: uuidv4(), name: "admin", created_at: new Date(), updated_at: new Date() },
      { id: uuidv4(), name: "user", created_at: new Date(), updated_at: new Date() },
    ]);
  },

  down: async (queryInterface: QueryInterface) => {
    return queryInterface.bulkDelete("roles", {});
  },
};
