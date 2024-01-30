import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

import { variableConfig } from "./config/config.js";
import socketsService from "./sockets/index.socket.js";
import rutasApp from "./routes/index.routes.js";
import { inyeccionMiddleware } from "./middleware/inyeccion.middleware.js";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);
app.set("port", variableConfig.port || 3000);

inyeccionMiddleware(app, express);

app.use("/api", rutasApp);
socketsService(io);

export { app, httpServer };