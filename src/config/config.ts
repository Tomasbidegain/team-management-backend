import { Dialect } from "sequelize";
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_USER } from ".";

interface DBConfigAttributes {
  username: string;
  password: string;
  database: string;
  host: string;
  dialect: Dialect;
}

const config: { [key: string]: DBConfigAttributes } = {
  development: {
    username: DB_USER || "",
    password: DB_PASSWORD || "",
    database: DB_NAME || "",
    host: DB_HOST || "127.0.0.1",
    dialect: "postgres" as Dialect,
  },
  // Configuración para test y producción...
};

export default config;
