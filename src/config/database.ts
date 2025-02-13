import { Sequelize } from 'sequelize-typescript'
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize({
  database: process.env.DB_NAME || '',
  username: process.env.DB_USER || '',
  password: process.env.DB_PASSWORD || '',
  host: process.env.DB_HOST || 'localhost',
  dialect: "postgres",
  storage: "database.postgres",
  models: [__dirname + "/../models"], // Directorio de modelos
  logging: false // Para evitar logs innecesarios
}
);

export default sequelize;
