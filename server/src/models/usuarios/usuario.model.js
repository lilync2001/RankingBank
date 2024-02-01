import { DataTypes } from "sequelize";
import { sequelize } from "../../database/index.database.js";

export const Usuario = sequelize.define(
  "usuario",
  {
    usuarioID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    nombre: {
      type: DataTypes.STRING(255),
      required: true,
    },
    apellido: {
      type: DataTypes.STRING(255),
      required: true,
    },
    cedula: {
      type: DataTypes.STRING(255),
      required: true,
      unique: true,
    },
    telefono: {
      type: DataTypes.STRING(255),
    },
    email: {
      type: DataTypes.STRING(255),
      unique: true,
      required: true,
    },
    password: {
      type: DataTypes.STRING(255),
      required: true,
    },
    rol: {
      type: DataTypes.STRING(255),
      defaultValue: "ASESOR",
      enum: ["ADMIN", "ASESOR", "SUPERVISOR"],
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