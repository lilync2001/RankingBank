import { DataTypes } from "sequelize";
import { sequelize } from "../../database/index.database.js";
import { Usuario } from "../usuarios/usuario.model.js";
import { Ranking } from "../ranking/rankig.model.js";

export const RankingUsuario = sequelize.define(
  "ranking_usuario",
  {
    rankingUsuarioID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    rankingID: {
      type: DataTypes.INTEGER,
      references: {
        model: Ranking,
        key: "rankingID",
      },
    },
    usuarioID: {
      type: DataTypes.INTEGER,
      references: {
        model: Usuario,
        key: "usuarioID",
      },
    },
    montoTotalVentas: {
      type: DataTypes.BIGINT,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

RankingUsuario.belongsTo(Ranking, {
  foreignKey: "rankingID",
  as: "ranking",
});

RankingUsuario.belongsTo(Usuario, {
  foreignKey: "usuarioID",
  as: "usuario",
});