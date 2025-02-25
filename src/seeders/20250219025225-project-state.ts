import { QueryInterface } from "sequelize";
import { v4 as uuidv4 } from "uuid";

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    return queryInterface.bulkInsert("project_states", [
      { id: uuidv4(),name: "actived", created_at: new Date(), updated_at: new Date() },
      { id: uuidv4(),name: "paused", created_at: new Date(), updated_at: new Date() },
      { id: uuidv4(),name: "completed", created_at: new Date(), updated_at: new Date() },
      { id: uuidv4(),name: "canceled", created_at: new Date(), updated_at: new Date() },
    ]);
  },

  down: async (queryInterface: QueryInterface) => {
    return queryInterface.bulkDelete("project_states", {});
  },
};
