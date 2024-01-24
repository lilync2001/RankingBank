import Jwt from "jsonwebtoken";
import { variableConfig } from "../config/config.js";

export default function verificarSupervisor (req, res, next) {
  const token = req.header("x-token");
  if (!token) {
    return res.status(401).json({ status: false, error: "Token no proporcionado" });
  }

  try {
    const usuario = Jwt.verify(token, variableConfig.jwtSecret);
    if (usuario.rolID !== 3) {
      return res.status(403).json({ status: false, error: "Acceso denegado. Se requiere rol de supervisor" });
    }
    req.usuario = usuario;
    next();
  } catch (error) {
    return res.status(401).json({ status: false, error: "Token inválido" });
  }
};



// Middleware para verificar si el usuario es asesor
const verificarAsesor = (req, res, next) => {
  // Similar al middleware de supervisor, pero verificando rolID 2 para asesor
};
