import { Credito as CreditoModel } from "../models/creditos/credito.model.js";
import { Usuario as UsuarioModel } from "../models/usuarios/usuario.model.js";

export default class CreditoRepository {
  async crearCredito(credito) {
    try {
      const CreditoCreado = await CreditoModel.create(credito);
      return CreditoCreado;
    } catch (error) {
      throw error;
    }
  }

  async obtenerTodosLosCreditos() {
    try {
      const creditos = await CreditoModel.findAll();
      return creditos;
    } catch (error) {
      throw error;
    }
  }

  async obtenerCreditosPorUsuario() {
    try {
      const creditos = await CreditoModel.findAll({
        include: {
          model: UsuarioModel,
          as: "usuario",
          attributes: ["usuarioID", "nombre", "apellido"],
        },
      });
      return creditos;
    } catch (error) {
      throw error;
    }
  }

  async obtenerCreditoPorID(creditoID) {
    try {
      const credito = await CreditoModel.findByPk(creditoID);
      if (!credito) throw Error("Credito no encontrado");
      return credito;
    } catch (error) {
      throw error;
    }
  }

  async cambiarEstadoCredito(creditoID, estado) {
    try {
      const creditoActualizado = await CreditoModel.update(
        { estado },
        {
          where: {
            creditoID,
          },
        }
      );
      if (creditoActualizado[0] === 0) throw Error("Credito no encontrado");
      return "Credito actualizado correctamente";
    } catch (error) {
      throw error;
    }
  }
}