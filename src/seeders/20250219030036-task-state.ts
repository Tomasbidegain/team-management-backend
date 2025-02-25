import { QueryInterface } from "sequelize";
import { v4 as uuidv4 } from "uuid";

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    return queryInterface.bulkInsert("task_states", [
      { id: uuidv4(), name: "pending", created_at: new Date(), updated_at: new Date() },
      { id: uuidv4(), name: "progress", created_at: new Date(), updated_at: new Date() },
      { id: uuidv4(), name: "blocked", created_at: new Date(), updated_at: new Date() },
      { id: uuidv4(), name: "finished", created_at: new Date(), updated_at: new Date() },
      { id: uuidv4(), name: "canceled", created_at: new Date(), updated_at: new Date() },
    ]);
  },

  down: async (queryInterface: QueryInterface) => {
    return queryInterface.bulkDelete("task_states", {});
  },
};
