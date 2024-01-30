import configCreditoRepository from "../repositories/configCredito.repository.js";
import { CustomError } from "../errors/index.error.js";
import { generartoken } from "../utils/index.utils.js";

export default class configCreditoService {
  constructor() {
    this.configCreditoRepository = new configCreditoRepository();
  }

  async obtenerConfigPorID(id) {
    try {
      const configcredito = await this.configCreditoRepository.obtenerConfigPorID(id);
      return configcredito;
    } catch (error) {
      let statusCode = 500;
      if (error instanceof Error) statusCode = 404;
      throw new CustomError(
        "Error servicio al obtener la configuracion por Id",
        statusCode,
        error
      );
    }
  }
  async crearConfigcredito(configCredito) {
    try {
        const configuracionCreada = await this.configCreditoRepository.crearconfigCredito(configCredito);
          return configuracionCreada;
        
        } catch (error) {
        let statusCode = 500;
        if (error instanceof Error) statusCode = 400;
        throw new CustomError(
            "Error servicio al crear la configuración de créditos",
            statusCode,
            error
        );
    }
  }

  async cambiarConfigCredito(configCredito) {
    try {
      const configActualizada = await this.configCreditoRepository.actualizarConfig(configCredito);

      return configActualizada;
    } catch (error) {
      let statusCode = 500;
      if (error.message === "Configuración no encontrada") statusCode = 404;
      throw new CustomError(
        "Error servicio al actualizar la configuración de créditos",
        statusCode,
        error
      );
    }
  }
}