import { DataTypes } from "sequelize";
import { sequelize } from "../../database/index.database.js";

export const ConfigCredito = sequelize.define(
  "config_credito",
  {
    configID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    montoMinimo: {
        type: DataTypes.INTEGER,
    },
    montoMaximo: {
        type: DataTypes.INTEGER,
    },
    plazoMinimo: {
      type: DataTypes.INTEGER,
    },
    plazoMaximo: {
        type: DataTypes.INTEGER,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);
