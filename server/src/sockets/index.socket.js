import RankingService from "../services/ranking.services.js";
import { verificarToken } from "../utils/index.utils.js";

const rankingService = new RankingService();
export default (io) => {
  io.on("connection", async (socket) => {
    const [valido, usuarioID] = verificarToken(
      socket.handshake.headers["x-token"]
    );

    console.log(`User connected: usuarioID ${usuarioID.usuarioID}`);
    if (!valido) {
      console.log("Token no válido");
      socket.emit("error", { error: "Token no válido" });
      return socket.disconnect();
    }

    try {
      const ranking = await rankingService.listarRankingsClasificacion();
      io.emit("ranking", ranking);
    } catch (error) {
      socket.emit("error", {
        status: false,
        error: error.message,
        errorStack: "" + error.originalError,
      });
    }
    socket.on("sale", async (sale) => {
      try {
        // Crea la venta
        await rankingService.insertarVentaActualizarRanking({
          monto: sale.monto,
          usuarioID: usuarioID.usuarioID,
        });

        const ranking = await rankingService.listarRankingsClasificacion();
        io.emit("ranking", ranking);
      } catch (error) {
        socket.emit("error", {
          status: false,
          error: error.message,
          errorStack: "" + error.originalError,
        });
      }
    });

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });
};
