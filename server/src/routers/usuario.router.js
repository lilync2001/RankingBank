import { Router } from "express";
import UsuarioController from "../controllers/usuario.controller.js";

const usuarioRouter = Router();
const controller = new UsuarioController();

usuarioRouter.get("/", controller.obtenerUsuarios.bind(controller));
usuarioRouter.get("/:id", controller.obtenerUsuarioPorID.bind(controller));
usuarioRouter.post("/", controller.crearUsuario.bind(controller));
usuarioRouter.put("/:id", controller.actualizarUsuario.bind(controller));
usuarioRouter.delete("/:id", controller.eliminarUsuario.bind(controller));

export default usuarioRouter;
