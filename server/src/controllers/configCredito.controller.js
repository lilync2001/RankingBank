import configCreditoServices from "../services/configCredito.services.js";
import { CustomError } from "../errors/index.error.js";

export default class ConfigCreditoController {
  constructor() {
    this.configCreditoService = new configCreditoServices();
  }

  async obtenerConfigPorID(req, res) {
    try {
      const { id } = req.params;
      const config = await this.configCreditoService.obtenerConfigPorID(id);
      return res.status(200).json({
        status: true,
        body: config,
      });
    } catch (error) {
      res.status(error.statusCode || 500).json({
        status: false,
        error: error.message,
        errorStack: "" + error.originalError,
      });
    }
  }

  async crearConfigcredito(req, res) {
    try {
      const configcredito = await this.configCreditoService.crearConfigcredito(req.body);
      return res.status(201).json({
        status: true,
        body: configcredito,
      });
    } catch (error) {
      res.status(error.statusCode || 500).json({
        status: false,
        error: error.message,
        errorStack: "" + error.originalError,
      });
    }
  }

  async cambiarConfigCredito(req, res) {
    try {
      const { id } = req.params;
      const { body } = req;
      const configcredito = await this.configCreditoService.obtenerConfigPorID(id);
      body.configID = configcredito.configID;
      //console.log('body', body)
      const configActualizada = await this.configCreditoService.cambiarConfigCredito(
        body
      );
      return res.status(200).json({
        body: configActualizada,
        status: true,
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