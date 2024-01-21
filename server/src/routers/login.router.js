import { Router } from "express";
import UsuarioController from "../controllers/usuario.controller.js";
const loginRouter = Router();

const controller = new UsuarioController();

loginRouter.post("/login/", controller.login.bind(controller));

export default loginRouter;
