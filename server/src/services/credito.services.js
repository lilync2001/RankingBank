import CreditoRepository from "../repositories/credito.repository.js";
import { CustomError } from "../errors/index.error.js";

export default class CreditoService {
  constructor() {
    this.creditoRepository = new CreditoRepository();
  }

  async aprobarCredito(creditoID) {
    try {
      const creditoAprobado = await this.creditoRepository.aprobarCredito(creditoID);
      return creditoAprobado;
    } catch (error) {
      throw new CustomError(
        "Error servicio al aprobar el crédito",
        500,
        error
      );
    }
  }

  async rechazarCredito(creditoID) {
    try {
      // Lógica para rechazar un crédito
      const creditoRechazado = await this.creditoRepository.rechazarCredito(creditoID);
      return creditoRechazado;
    } catch (error) {
      throw new CustomError(
        "Error servicio al rechazar el crédito",
        500,
        error
      );
    }
  }

  async ingresarCredito(datosCredito) {
    try {
      // Lógica para ingresar un nuevo crédito
      const nuevoCredito = await this.creditoRepository.ingresarCredito(datosCredito);
      return nuevoCredito;
    } catch (error) {
      throw new CustomError(
        "Error servicio al ingresar el crédito",
        500,
        error
      );
    }
  }
}
