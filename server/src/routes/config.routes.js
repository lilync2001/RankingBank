import { Router } from "express";
import ConfigCreditoController from "../controllers/configCredito.controller.js";
import { verificarRol } from "../utils/index.utils.js";


const configCreditosRouter = Router();
const controller = new ConfigCreditoController();


configCreditosRouter.get("/:id",verificarRol("ADMIN"), controller.obtenerConfigPorID.bind(controller));
configCreditosRouter.post("/",verificarRol("ADMIN"), controller.crearConfigcredito.bind(controller));
configCreditosRouter.put(
  "/:id",
  verificarRol("ADMIN"),
  controller.cambiarConfigCredito.bind(controller)
);

export default configCreditosRouter;
