import RankingService from "../services/ranking.services.js";

export default class RankingController {
  constructor() {
    this.rankingService = new RankingService();
  }

  async crearRanking(req, res) {
    try {
      const { fechaInicio, fechaFin, meta } = req.body;
      const ranking = await this.rankingService.crearRanking({
        fechaInicio,
        fechaFin,
        meta,
      });
      return res.status(201).json({
        status: true,
        body: ranking,
      });
    } catch (error) {
      res.status(error.statusCode || 500).json({
        status: false,
        error: error.message,
        errorStack: "" + error.originalError,
      });
    }
  }

  async obtenerRankings(req, res) {
    try {
      const rankings = await this.rankingService.obtenerRankings();
      return res.status(200).json({
        body: rankings,
        estado: true,
      });
    } catch (error) {
      res.status(error.statusCode || 500).json({
        status: false,
        error: error.message,
        errorStack: "" + error.originalError,
      });
    }
  }

  async obtenerRankingPorID(req, res) {
    try {
      const { id } = req.params;
      const ranking = await this.rankingService.obtenerRankingPorID(id);
      return res.status(200).json({
        body: ranking,
        estado: true,
      });
    } catch (error) {
      res.status(error.statusCode || 500).json({
        status: false,
        error: error.message,
        errorStack: "" + error.originalError,
      });
    }
  }

  async finalizarRanking(req, res) {
    try {
      const { id } = req.params;
      const ranking = await this.rankingService.finalizarRanking(id);
      return res.status(200).json({
        body: ranking,
        estado: true,
      });
    } catch (error) {
      res.status(error.statusCode || 500).json({
        status: false,
        error: error.message,
        errorStack: "" + error.originalError,
      });
    }
  }

  async listarRankingsClasificacion(req, res) {
    try {
      const rankings = await this.rankingService.listarRankingsClasificacion();
      return res.status(200).json({
        body: rankings,
        estado: true,
      });
    } catch (error) {
      res.status(error.statusCode || 500).json({
        status: false,
        error: error.message,
        errorStack: "" + error.originalError,
      });
    }
  }

  async actualizarRankingUsuario(body) {
    try {
      const { montoTotalVentas, usuarioID } = body;
      const ranking = await this.rankingService.actualizarRankingUsuario({
        montoTotalVentas,
        usuarioID,
      });
      return {
        body: ranking,
        estado: true,
      };
    } catch (error) {
      res.status(error.statusCode || 500).json({
        status: false,
        error: error.message,
        errorStack: "" + error.originalError,
      });
    }
  }
}
