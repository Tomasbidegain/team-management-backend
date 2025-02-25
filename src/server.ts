import app from "./app";
import dotenv from "dotenv";
import sequelize from "./config/database";

dotenv.config();

const PORT = process.env.PORT || 4000;

sequelize.authenticate()
  .then(() => {
    console.log('Conexión a la base de datos exitosa');
    // Iniciar el servidor solo si la base de datos está conectada
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error conectando a la base de datos:', error);
    process.exit(1); // Finaliza el proceso si no se puede conectar
  });