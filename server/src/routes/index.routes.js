import { Router } from "express";

import loginRouter from "./login.routes.js";
import usuarioRouter from "./usuario.routes.js";
import rankingRouter from "./ranking.routes.js";
import validarTokenAuth from "../middleware/login.middleware.js";
const router = Router();
router.use("/auth", loginRouter);
//router.use(validarTokenAuth);
router.use("/usuario", usuarioRouter);
router.use("/ranking", rankingRouter);
export default router;
