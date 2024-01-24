import CreditoService from "../services/credito.services.js";

export default class CreditoController {
    constructor(){
        this.creditoService = new CreditoService();
    }
    async aprobarCredito(req,res){  
        try {
            const { creditoID } = req.params;
            const credito = await this.creditoService.aprobarCredito(creditoID);
            if (!credito) {
            return res.status(404).json({ 
                mensaje: "Crédito no encontrado" 
            });
            }
            // Actualizar el estado del crédito a 'aprobado'
            credito.estadoCredito = 'aprobado';
            await credito.save();
            res.json({ 
                mensaje: "Crédito aprobado con éxito" 
            });
        } catch (error) {
            res.status(error.statusCode || 500).json({
                status: false,
                error: error.message,
                errorStack: "" + error.originalError,
              });
        }
    };
  
  // Método para rechazar crédito
    async rechazarCredito(req, res){
        try {
            const { creditoID } = req.params;
            const credito = await this.creditoService.rechazarCredito(creditoID);
            if (!credito) {
            return res.status(404).json({ 
                mensaje: "Crédito no encontrado" 
            });
            }
            // Actualizar el estado del crédito a 'aprobado'
            credito.estadoCredito = 'rechazado';
            await credito.save();
            res.json({ 
                mensaje: "Crédito rechazado con éxito" 
            });
        } catch (error) {
            res.status(error.statusCode || 500).json({
                status: false,
                error: error.message,
                errorStack: "" + error.originalError,
              });
        }
    }

    async ingresarCredito(req, res){
        try {
            const { usuarioID, monto } = req.body;
            const nuevoCredito = await this.creditoService.ingresarCredito({ usuarioID, monto });

            res.status(201).json({ mensaje: "Crédito ingresado con éxito", credito: nuevoCredito });
        } catch (error) {
            res.status(error.statusCode || 500).json({
                status: false,
                error: error.message,
                errorStack: "" + error.originalError,
              });
        }
    }

}
  