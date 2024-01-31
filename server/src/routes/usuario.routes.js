import { Router } from "express";
import UsuarioController from "../controllers/usuario.controller.js";
import { verificarRol } from "../utils/index.utils.js";

const usuarioRouter = Router();
const controller = new UsuarioController();

usuarioRouter.get("/", controller.obtenerUsuarios.bind(controller));
usuarioRouter.get("/:id", controller.obtenerUsuarioPorID.bind(controller));
usuarioRouter.post("/", verificarRol("ADMIN"), controller.crearUsuario.bind(controller));
usuarioRouter.put("/:id", controller.actualizarUsuario.bind(controller));
usuarioRouter.delete("/:id", controller.eliminarUsuario.bind(controller));

export default usuarioRouter;
