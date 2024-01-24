import Jwt from "jsonwebtoken";
import { variableConfig } from "../config/config.js";

export default function verificarAsesor (req, res, next) {
  const token = req.header("x-token");
  if (!token) {
    return res.status(401).json({ status: false, error: "Token no proporcionado" });
  }

  try {
    const usuario = Jwt.verify(token, variableConfig.jwtSecret);
    if (usuario.rolID !== 2) {
      return res.status(403).json({ status: false, error: "Acceso denegado. Se requiere rol de asesor" });
    }
    req.usuario = usuario;
    next();
  } catch (error) {
    return res.status(401).json({ status: false, error: "Token inválido" });
  }
};

