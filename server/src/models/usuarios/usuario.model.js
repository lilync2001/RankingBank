import { DataTypes } from "sequelize";
import { sequelize } from "../../database/index.database.js";
import { Rol } from "../roles/rol.model.js";

export const Usuario = sequelize.define(
  "usuario",
  {
    usuarioID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    rolID: {
      type: DataTypes.INTEGER,
      //defaultValue: 2,
      references: {
        model: Rol,
        key: "rolID",
      },
    },
    nombre: {
      type: DataTypes.STRING(255),
      required: true,
    },
    apellido: {
      type: DataTypes.STRING(255),
      required: true,
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

Usuario.belongsTo(Rol, {
  foreignKey: "rolID",
  as: "rol",
});