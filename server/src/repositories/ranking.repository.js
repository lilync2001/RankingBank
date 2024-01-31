import { Ranking as RankingModel } from "../models/ranking/rankig.model.js";
import { Usuario as UsuarioModel } from "../models/usuarios/usuario.model.js";
//import { Credito as CreditoModel } from "../models/creditos/credito.model.js";
import { RankingUsuario as RankingUsuarioModel } from "../models/rankingUsuario/rankingUsuario.model.js";
import { parseMoney } from "../utils/index.utils.js";
export default class RankingRepository {
  async crearRanking(ranking) {
    try {
      await RankingModel.sequelize.transaction(async (t) => {
        const RankingCreado = await RankingModel.create(ranking, {
          transaction: t,
        });

        const usuariosVendedores = await UsuarioModel.findAll({
          where: {
            rol: "ASESOR",
          },
        });

        const registrosRankingUsuario = usuariosVendedores.map((usuario) => ({
          usuarioID: usuario.usuarioID,
          rankingID: RankingCreado.rankingID,
          montoTotalVentas: 0, // Inicialmente sin ventas
        }));

        await RankingUsuarioModel.bulkCreate(registrosRankingUsuario, {
          transaction: t,
        });

        return {
          rankingID: RankingCreado.rankingID,
          fechaInicio: RankingCreado.fechaInicio,
          fechaFin: RankingCreado.fechaFin,
          meta: parseMoney(RankingCreado.meta),
        };
      });
    } catch (error) {
      throw error;
    }
  }

  async obtenerRankings() {
    try {
      const rankings = await RankingModel.findAll();

      return rankings.map((ranking) => {
        return {
          rankingID: ranking.rankingID,
          fechaInicio: ranking.fechaInicio,
          fechaFin: ranking.fechaFin,
          meta: parseMoney(ranking.meta),
          estado: ranking.estado,
        };
      });
    } catch (error) {
      throw error;
    }
  }

  async obtenerRankingActivo() {
    try {
      const ranking = await RankingModel.findOne({
        where: {
          estado: true,
        },
      });

      if (!ranking) return null;

      return {
        rankingID: ranking.rankingID,
        fechaInicio: ranking.fechaInicio,
        fechaFin: ranking.fechaFin,
        meta: parseMoney(ranking.meta),
        estado: ranking.estado,
      };
    } catch (error) {
      throw error;
    }
  }

  async obtenerRankingPorID(rankingID) {
    try {
      const ranking = await RankingModel.findOne({
        where: {
          rankingID,
        },
      });

      if (!ranking || ranking === null) throw Error("Ranking no encontrado");

      const rankingUsuario = ranking.rankingID;

      const usuarios = await RankingUsuarioModel.findAll({
        where: {
          rankingID: rankingUsuario,
        },
        order: [["montoTotalVentas", "DESC"]],
        include: {
          model: UsuarioModel,
          as: "usuario",
          attributes: ["nombre", "apellido"],
        },
      });

      return {
        fechaInicio: ranking.fechaInicio,
        fechaFin: ranking.fechaFin,
        meta: parseMoney(ranking.meta),
        estado: ranking.estado,
        usuarios: usuarios.map((usuario) => ({
          nombre: usuario.usuario.nombre + " " + usuario.usuario.apellido,
          montoTotalVentas: parseMoney(usuario.montoTotalVentas),
        })),
      };
    } catch (error) {
      throw error;
    }
  }

  async listarRankingsClasificacion() {
    try {
      const ranking = await RankingModel.findOne({
        where: {
          estado: true,
        },
      });

      if (!ranking || ranking === null) throw Error("Ranking no encontrado");

      const rankingUsuario = ranking.rankingID;
      //console.log('rankingUsuario', rankingUsuario)
      const usuarios = await RankingUsuarioModel.findAll({
        where: {
          rankingID: rankingUsuario,
        },
        order: [["montoTotalVentas", "DESC"]],
        include: {
          model: UsuarioModel,
          as: "usuario",
          attributes: ["nombre", "apellido"],
        },
      });
      //where con estado aprobado'
      //console.log('usuarios', usuarios)
      return usuarios.map((usuario) => ({
        nombre: usuario.usuario.nombre + " " + usuario.usuario.apellido,
        montoTotalVentas: parseMoney(usuario.montoTotalVentas),
      }));
    } catch (error) {
      throw error;
    }
  }

  async actualizarRankingUsuario(rankingUsuario) {
    try {
      const rankingUsuario = await RankingUsuarioModel.findOne({
        where: {
          usuarioID: rankingUsuario.usuarioID,
          rankingID: rankingUsuario.rankingID,
        },
      });

      rankingUsuario.dataValues.montoTotalVentas +=
        rankingUsuario.montoTotalVentas;

      await rankingUsuario.save();

      return {
        montoTotalVentas: parseMoney(rankingUsuario.montoTotalVentas),
      };
    } catch (error) {
      throw error;
    }
  }

  async finalizarRanking(rankingID) {
    try {
      const ranking = await RankingModel.update(
        {
          estado: false,
        },
        {
          where: {
            rankingID: rankingID,
          },
        }
      );
      if (ranking[0] === 0) throw Error("Ranking no encontrado");
      return "Ranking finalizado";
    } catch (error) {
      throw error;
    }
  }

  async insertarVentaYActualizarRanking(venta) {
    try {
      const { usuarioID, monto } = venta;
     
        const ranking = await RankingModel.findOne({
          where: {
            estado: true,
          },
        });
        console.log('ranking', ranking)
        const rankingUsuario = await RankingUsuarioModel.findOne({
          where: {
            rankingID: ranking.dataValues.rankingID,
            usuarioID: usuarioID,
          },
        });
        console.log('prueba', rankingUsuario)
        const saldo =
          parseInt(rankingUsuario.montoTotalVentas) + parseInt(monto);
        rankingUsuario.montoTotalVentas = saldo;

        await rankingUsuario.save();
        return true;
      
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
