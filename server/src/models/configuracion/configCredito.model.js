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
        allowNull: false,
    },
    montoMaximo: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    plazoMinimo: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    plazoMaximo: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);
