import app from "./app.js";
import { sequelize } from "./database/index.database.js";
async function main() {
    try {
        try {
            await sequelize.sync({ force: false, logging: console.log });
            console.log('Conexión exitosa');
            app.listen(3000);
            console.log('Servidor escuchando en el puerto', 3000);
        } catch (error) {
            console.log(error.message)
        }
    } catch (error) {
        console.log('ERROR!, No se puede conectar a la base de datos');
    }
}

main();
export default {main}