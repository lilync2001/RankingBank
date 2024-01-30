import { DataTypes } from "sequelize";
import { sequelize } from "../../database/index.database.js";
import { Usuario } from "../usuarios/usuario.model.js";

export const Credito = sequelize.define(
  "credito",
  {
    creditoID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    usuarioID: {
      type: DataTypes.INTEGER,
      references: {
        model: Usuario,
        key: "usuarioID",
      },
    },
    fecha: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    plazo: {
      type: DataTypes.INTEGER,
    },
    monto: {
      type: DataTypes.BIGINT,
    },
    estado: {
      type: DataTypes.STRING(255),
      defaultValue: "PENDIENTE",
      enum: ["APROBADO", "RECHAZADO", "PENDIENTE"],
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

Credito.belongsTo(Usuario, {
  foreignKey: "usuarioID",
  as: "usuario",
});