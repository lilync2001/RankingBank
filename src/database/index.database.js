import { Sequelize } from "sequelize";
import { dbVariables } from "../config/config.js";

export const sequelize = new Sequelize(
    dbVariables.dbName,
    dbVariables.dbUser,
    dbVariables.dbPassword,
    {
        host: dbVariables.dbServer,
        dialect: dbVariables.dbDialect,
        logging: false,
        port: dbVariables.dbPort,
    }
);