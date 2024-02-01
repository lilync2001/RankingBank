import { Router } from "express";
import RankingController from "../controllers/ranking.controller.js";
import { verificarRol } from "../utils/index.utils.js";

const rankingRouter = Router();
const controller = new RankingController();

rankingRouter.get("/", controller.obtenerRankings.bind(controller));
rankingRouter.get(
  "/clasificacion",
  controller.listarRankingsClasificacion.bind(controller)
);
rankingRouter.get("/:id", controller.obtenerRankingPorID.bind(controller));
rankingRouter.post("/",verificarRol("ADMIN"), controller.crearRanking.bind(controller));
rankingRouter.delete("/:id",verificarRol("ADMIN"), controller.finalizarRanking.bind(controller));

export default rankingRouter;
