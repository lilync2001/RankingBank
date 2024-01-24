import { Credito as CreditoModel } from "../models/creditos/credito.model.js";

export default class CreditoRepository {
    async aprobarCredito(creditoID) {
        try{
            const credito = await CreditoModel.findByPk(creditoID);
            if (!credito) throw new Error("Crédito no encontrado");
        
            credito.estadoCredito = 'aprobado'; 
            await credito.save();
        
            return credito;
        } catch (error) {
            throw error;
        }

    }

    async rechazarCredito(creditoID) {
        try{
            const credito = await CreditoModel.findByPk(creditoID);
            if (!credito) throw new Error("Crédito no encontrado");
        
            credito.estadoCredito = 'rechazado'; 
            await credito.save();
        
            return credito;
        } catch (error) {
            throw error;
        }

    }
    
    async ingresarCredito(datosCredito) {
        try {
          const nuevoCredito = await CreditoModel.create(datosCredito);
          return nuevoCredito;
        } catch (error) {
          throw new Error("Error al ingresar el crédito");
        }
      }


}

 
