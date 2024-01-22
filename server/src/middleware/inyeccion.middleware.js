import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";

export function inyeccionMiddleware(app, express) {
  app.use(
    cors({
      origin: ["http://localhost:4200", "https://localhost:4200"],
      credentials: true,
    })
  );
  app.use(cookieParser());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(
    morgan(":method :url :status :res[content-length] - :response-time ms")
  );
}
