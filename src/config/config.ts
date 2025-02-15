import { Dialect } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

interface DBConfigAttributes {
  username: string;
  password: string;
  database: string;
  host: string;
  dialect: Dialect;
}

const config: { [key: string]: DBConfigAttributes } = {
  development: {
    username: process.env.DB_USER || "",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "",
    host: process.env.DB_HOST || "127.0.0.1",
    dialect: "postgres" as Dialect,
  },
  // Configuración para test y producción...
};

export default config;
