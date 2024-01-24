import { Router } from "express";
import CreditoController from "../controllers/credito.controller.js";

const creditoRouter = Router();
const controller = new CreditoController();

//supervisor
creditoRouter.post('/:creditoID/aprobar', controller.aprobarCredito.bind(controller));
creditoRouter.post('/:creditoID/rechazar', controller.rechazarCredito.bind(controller));

// Ruta para asesores
creditoRouter.post('/ingresar', controller.ingresarCredito.bind(controller));
export default creditoRouter;
