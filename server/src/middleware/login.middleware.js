import Jwt from "jsonwebtoken";
import { variableConfig } from "../config/config.js";

export default function validarTokenAuth(req, res, next) {
  const token = req.header("x-token");
  if (!token) {
    return res.status(401).json({
      status: false,
      error: "No autorizado. Requiere token",
      errorStack: "",
    });
  }
  try {
    const verificar = Jwt.verify(token, variableConfig.jwtSecret);
    req.usuario = verificar;
    next();
  } catch (error) {
    return res.status(401).json({
      status: false,
      error: "No autorizado. Token inválido",
      errorStack: "" + error,
    });
  }
}
