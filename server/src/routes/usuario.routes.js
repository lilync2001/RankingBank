import { Router } from "express";
import UsuarioController from "../controllers/usuario.controller.js";
import { verificarRol } from "../utils/index.utils.js";

const usuarioRouter = Router();
const controller = new UsuarioController();

usuarioRouter.get(
  "/",
  verificarRol("ADMIN"),
  controller.obtenerUsuarios.bind(controller)
);
usuarioRouter.get(
  "/:id",
  verificarRol("ADMIN"),
  controller.obtenerUsuarioPorID.bind(controller)
);
usuarioRouter.post(
  "/",
  verificarRol("ADMIN"),
  controller.crearUsuario.bind(controller)
);
usuarioRouter.put(
  "/password/:id",
  controller.actualizarContrasena.bind(controller)
);
usuarioRouter.put("/:id", controller.actualizarUsuario.bind(controller));
usuarioRouter.delete(
  "/:id",
  verificarRol("ADMIN"),
  controller.eliminarUsuario.bind(controller)
);

export default usuarioRouter;
