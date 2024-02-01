import { Router } from "express";
import CreditoController from "../controllers/credito.controller.js";
import { verificarRol } from "../utils/index.utils.js";


const creditosRouter = Router();
const controller = new CreditoController();

creditosRouter.get("/", verificarRol("SUPERVISOR"), controller.obtenerCreditos.bind(controller));
creditosRouter.get("/:id", verificarRol("SUPERVISOR"), controller.obtenerCreditoPorID.bind(controller));
creditosRouter.post("/",  verificarRol("ASESOR"),controller.crearCredito.bind(controller));
creditosRouter.put(
  "/estado/:id",
  verificarRol("SUPERVISOR"),
  controller.cambiarEstadoCredito.bind(controller)
);

export default creditosRouter;
