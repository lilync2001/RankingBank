import { httpServer, app } from "./app.js";
import { sequelize } from "./database/index.database.js";
async function main() {
    try {
        // iniciar servidor de base de datos {force: true}
        await sequelize.sync();
        sequelize
          .authenticate()
          .then(() => {
            console.log("Conectado a la base de datos");
          })
          .catch((error) => {
            console.log("Error al conectar a la base de datos", error);
          });
    
        // iniciar servidor de aplicacion
        httpServer.listen(app.get("port"), () => {
          console.log("Servidor en puerto: ", app.get("port"));
        });
      } catch (error) {
        console.log("Error al iniciar el servidor", error);
      }
}

main();
export default {main}