import CreditoRepository from "../repositories/credito.repository.js";
import RankingService from "./ranking.services.js";
import dayjs from "dayjs";
import configCreditoService from "./configCredito.services.js";

export default class CreditoServices {
  constructor() {
    this.creditoRepository = new CreditoRepository();
    this.rankingService = new RankingService();
    this.configCreditoService = new configCreditoService();
  }

  async crearCredito(credito) {
    try {
      const configCredito = await this.configCreditoService.obtenerConfigPorID(1)
      console.log('configC', configCredito)

      if (credito.monto < configCredito.montoMinimo || credito.monto >  configCredito.montoMaximo) {
        throw Error("El monto ingresado debe estar entre $1000 y $40000");
      }
      if (credito.plazo <  configCredito.plazoMinimo || credito.plazo > configCredito.plazoM) {
        throw Error("El plazo ingresado debe estar entre 12 y 48 meses");
      }
      //validar si la fecha que se ingresa es mayor a la fecha actual con el formato YYYY-MM-DD
      const fechaActual = dayjs().format("YYYY-MM-DD");
      const fechaIngresada = dayjs(credito.fecha).format("YYYY-MM-DD");
      if (fechaIngresada < fechaActual) {
        throw Error("La fecha ingresada debe ser mayor a la fecha actual");
      }
      const CreditoCreado = await this.creditoRepository.crearCredito(credito);
      return CreditoCreado;
    } catch (error) {
      throw error;
    }
  }

  async obtenerTodosLosCreditos() {
    try {
      const creditos = await this.creditoRepository.obtenerTodosLosCreditos();
      return creditos;
    } catch (error) {
      throw error;
    }
  }

  async obtenerCreditoPorID(creditoID) {
    try {
      const credito = await this.creditoRepository.obtenerCreditoPorID(
        creditoID
      );
      if (!credito) throw Error("Credito no encontrado");
      return credito;
    } catch (error) {
      throw error;
    }
  }

  async cambiarEstadoCredito(creditoID, estado) {
    try {
      if (estado !== "APROBADO" && estado !== "RECHAZADO") {
        throw Error("El estado ingresado no es valido");
      }

      const band = estado === "APROBADO";

      if (band) {
        const creditoUser = await this.creditoRepository.obtenerCreditoPorID(
          creditoID
        );
        const monto = creditoUser.monto;
        const userID = creditoUser.usuarioID;
        await this.rankingService.insertarVentaActualizarRanking({
          monto: monto,
          usuarioID: userID,
        });
      }
      const creditoActualizado =
        await this.creditoRepository.cambiarEstadoCredito(creditoID, estado);
      if (creditoActualizado[0] === 0) throw Error("Credito no encontrado");
      return band
        ? "Credito aprobado. Notificando al Asesor"
        : "Credito rechazado. Notificando al Asesor";
    } catch (error) {
      throw error;
    }
  }
}