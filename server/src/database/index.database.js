import Sequelize from "sequelize";
import { variableConfig } from "../config/config.js";

export const sequelize = new Sequelize(
  variableConfig.dbName,
  variableConfig.dbUser,
  variableConfig.dbPassword,
  {
    host: variableConfig.dbServer,
    dialect: variableConfig.dbDialect,
    logging: false,
    port: variableConfig.dbPort,
  }
);