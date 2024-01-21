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

export function parseMoney(money) {
  const moneyFormat = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });
  // 1$ = 1000 centavos
  return moneyFormat.format(money / 1000);
}

export default { generartoken, verificarToken, parseMoney };
