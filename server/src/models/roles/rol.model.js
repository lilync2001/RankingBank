import { DataTypes } from "sequelize";
import { sequelize } from "../../database/index.database.js";

export const Rol = sequelize.define(
  "rol",
  {
    rolID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    nombre: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    estado: {
      type: DataTypes.BOOLEAN,
      default: true,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

