import { DataTypes } from "sequelize";
import { sequelize } from "../../database/index.database.js";

export const Ranking = sequelize.define(
  "ranking",
  {
    rankingID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    meta: {
      type: DataTypes.BIGINT,
    },
    fechaInicio: {
      type: DataTypes.DATE,
    },
    fechaFin: {
      type: DataTypes.DATE,
    },
    estado: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);