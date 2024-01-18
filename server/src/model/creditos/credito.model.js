import { DataTypes } from "sequelize";
import { sequelize } from "../../database/index.database";
import { Usuario } from "../usuarios/usuario.model";

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
    monto: {
      type: DataTypes.BIGINT,
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