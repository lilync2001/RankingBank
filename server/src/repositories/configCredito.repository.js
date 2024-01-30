import { ConfigCredito as ConfigModel } from "../models/configuracion/configCredito.model.js";

export default class configCreditoRepository {
  async crearconfigCredito(configCredito) {
    try {
      const configuracionCreada = await ConfigModel.create(configCredito);
      return configuracionCreada;
    } catch (error) {
      throw error;
    }
  }

  async actualizarConfig(body) {
    try {
      const configActualizada = await ConfigModel.update(body, {
        where: {
            configID: body.configID,
        },
      });
    
      if (configActualizada[0] === 0) throw Error("Configuración no encontrada");
      return "Configuración actualizada correctamente";
    } catch (error) {
      throw error;
    }
  }
  
  async obtenerConfigPorID(id) {
    try {
      const configcredito = await ConfigModel.findOne({
        where: {
          configID: id,
        },
      });
      if (!configcredito) throw Error("Configuración no encontrada");
      return {
        configID: configcredito.configID,
        montoMinimo: configcredito.montoMinimo,
        montoMaximo: configcredito.montoMaximo,
        plazoMinimo: configcredito.plazoMinimo,
        plazoMaximo: configcredito.plazoMaximo,
      };
    } catch (error) {
      throw error;
    }
  }
}