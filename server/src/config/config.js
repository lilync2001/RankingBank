import * as dotenv from "dotenv";

dotenv.config();

export const variableConfig = {
  host: process.env.HOST || "localhost",
  port: process.env.PORT || 3000,
  dbUser: process.env.DB_USER,
  dbServer: process.env.DB_SERVER,
  dbPassword: process.env.DB_PASSWORD,
  dbDialect: process.env.DB_DIALECT,
  dbName: process.env.DB_NAME,
  dbPort: process.env.DB_PORT,
  jwtSecret: process.env.SECRET_KEY,
};