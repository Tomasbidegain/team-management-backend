import { Sequelize } from 'sequelize-typescript'
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_USER } from '.';

const sequelize = new Sequelize({
  database: DB_NAME || '',
  username: DB_USER || '',
  password: DB_PASSWORD || '',
  host: DB_HOST || 'localhost',
  dialect: "postgres",
  storage: "database.postgres",
  models: [__dirname + "/../models"], // Directorio de modelos
  logging: false // Para evitar logs innecesarios
}
);

export default sequelize;
