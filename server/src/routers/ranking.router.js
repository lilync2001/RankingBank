import { Router } from "express";
import RankingController from "../controllers/ranking.controller.js";

const rankingRouter = Router();
const controller = new RankingController();

rankingRouter.get("/", controller.obtenerRankings.bind(controller));
rankingRouter.get(
  "/clasificacion",
  controller.listarRankingsClasificacion.bind(controller)
);
rankingRouter.get("/:id", controller.obtenerRankingPorID.bind(controller));
rankingRouter.post("/", controller.crearRanking.bind(controller));
rankingRouter.put(
  "/usuario",
  controller.actualizarRankingUsuario.bind(controller)
);
rankingRouter.delete("/:id", controller.finalizarRanking.bind(controller));

export default rankingRouter;
