import jwt from "jsonwebtoken";
import { variableConfig } from "../config/config.js";

export const generartoken = async (usuario) => {
  try {
    const token = await jwt.sign(
      {
        usuarioID: usuario.usuarioID,
        rol: usuario.rol,
      },
      variableConfig.jwtSecret,
      {
        expiresIn: "24h",
      }
    );
    return token;
  } catch (error) {
    return error;
  }
};

export const verificarToken = (token) => {
  try {
    const decoded = jwt.verify(token, variableConfig.jwtSecret);
    return [true, decoded];
  } catch (error) {
    return [false, error];
  }
};

export const verificarRol = (roles) => {
  return (req, res, next) => {
    const { rol } = req.usuario;
    if (roles.includes(rol)) {
      next();
    } else {
      return res.status(401).json({
        status: false,
        error: "No tienes permisos para realizar esta acción",
      });
    }
  };
};

export function parseMoney(money) {
  const moneyFormat = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });
  // 1$ = 100 centavos
  return moneyFormat.format(money / 100);
}

export default { generartoken, verificarToken, verificarRol, parseMoney };