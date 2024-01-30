import { Router } from "express";

import loginRouter from "./login.routes.js";
import usuarioRouter from "./usuario.routes.js";
import rankingRouter from "./ranking.routes.js";
import creditoRouter from "./credito.routes.js"
import validarTokenAuth from "../middleware/login.middleware.js";
import configCreditoRouter from "./config.routes.js";

const router = Router();
router.use("/auth", loginRouter);
router.use(validarTokenAuth)
router.use("/usuario", usuarioRouter);
router.use("/ranking", rankingRouter);
router.use("/credito", creditoRouter);
router.use("/config", configCreditoRouter);
export default router;
