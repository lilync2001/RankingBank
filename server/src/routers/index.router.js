import { Router } from "express";

import loginRouter from "./login.router.js";
import usuarioRouter from "./usuario.router.js";
import rankingRouter from "./ranking.router.js";

const router = Router();
router.use("/login", loginRouter);
router.use("/usuario", usuarioRouter);
router.use("/ranking", rankingRouter);

export default router;
