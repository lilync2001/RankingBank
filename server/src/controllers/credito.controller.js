import CreditoServices from "../services/credito.services.js";

export default class CreditoController {
  constructor() {
    this.creditoService = new CreditoServices();
  }

  async crearCredito(req, res) {
    try {
      const credito = await this.creditoService.crearCredito(req.body);
      return res.status(201).json({
        status: true,
        body: credito,
      });
    } catch (error) {
      res.status(error.statusCode || 500).json({
        status: false,
        error: error.message,
        errorStack: "" + error.originalError,
      });
    }
  }

  async obtenerCreditos(req, res) {
    try {
      const creditos = await this.creditoService.obtenerTodosLosCreditos();
      return res.status(200).json({
        body: creditos,
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

  async obtenerCreditoPorID(req, res) {
    try {
      const { id } = req.params;
      const credito = await this.creditoService.obtenerCreditoPorID(id);
      return res.status(200).json({
        body: credito,
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

  async cambiarEstadoCredito(req, res) {
    try {
      const { id } = req.params;
      const { estado } = req.body;
      const credito = await this.creditoService.cambiarEstadoCredito(
        id,
        estado
      );
      return res.status(200).json({
        body: credito,
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
}