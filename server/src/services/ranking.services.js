import RankingRepository from "../repositories/ranking.repository.js";
import { CustomError } from "../errors/index.error.js";
import configCreditoService from "./configCredito.services.js";
import dayjs from "dayjs";


export default class RankingService {
  constructor() {
    this.rankingRepository = new RankingRepository();
    this.configCreditoService = new configCreditoService();
  }

  async crearRanking(ranking) {
    try {
      const configCredito = await this.configCreditoService.obtenerConfigPorID(1)
      const rankingActivo = await this.rankingRepository.obtenerRankingActivo();
      if (rankingActivo) throw Error("Ya existe un ranking activo");
      if(ranking.meta< configCredito.montoMinimo){
        throw Error("La meta debe ser superior a $"+configCredito.montoMinimo);
      }

      //validar fechas
      const fechaActual = dayjs().format("YYYY-MM-DD");
      const fechaIngresada = dayjs(ranking.fechaInicio).format("YYYY-MM-DD");
      const fechaFinal =  dayjs(fechaIngresada).add(30,'day').format("YYYY-MM-DD");;
      const fechaFinI = dayjs(ranking.fechaFin).format("YYYY-MM-DD");
      
      if(fechaIngresada< fechaActual){
        throw Error("La fecha ingresada no puede ser anterior a la actual");
      }
      if(fechaFinI< fechaFinal){
        throw Error("La fecha final debe ser un mes después de la fecha de inicio");
      }

      const rankingCreado = await this.rankingRepository.crearRanking(ranking);
      return rankingCreado;
    } catch (error) {
      let statusCode = 500;
      if (error instanceof Error) statusCode = 400;
      throw new CustomError(
        "Error servicio al crear el ranking",
        statusCode,
        error
      );
    }
  }

  async obtenerRankings() {
    try {
      const rankings = await this.rankingRepository.obtenerRankings();
      return rankings;
    } catch (error) {
      throw new CustomError(
        "Error servicio al obtener todos los rankings",
        500,
        error
      );
    }
  }

  async finalizarRanking(rankingID) {
    try {
      const rankingFinalizado = await this.rankingRepository.finalizarRanking(
        rankingID
      );
      return rankingFinalizado;
    } catch (error) {
      let statusCode = 500;
      if (error instanceof Error) statusCode = 404;
      throw new CustomError(
        "Error servicio al finalizar el ranking",
        statusCode,
        error
      );
    }
  }

  async obtenerRankingPorID(id) {
    try {
      const ranking = await this.rankingRepository.obtenerRankingPorID(id);
      return ranking;
    } catch (error) {
      let statusCode = 500;
      if (error instanceof Error) statusCode = 404;
      throw new CustomError(
        "Error servicio al obtener el ranking por id",
        statusCode,
        error
      );
    }
  }

  async listarRankingsClasificacion() {
    try {
      const rankings =
        await this.rankingRepository.listarRankingsClasificacion();
      return {
        rankings,
      };
    } catch (error) {
      let statusCode = 500;
      if (error instanceof Error) statusCode = 404;
      throw new CustomError(
        "Error servicio al listar los rankings de clasificación",
        statusCode,
        error
      );
    }
  }

  async actualizarRankingUsuario(ranking) {
    try {
      const rankingActivo = await this.rankingRepository.obtenerRankingActivo();
      ranking.rankingID = rankingActivo.rankingID;
      const rankingActualizado =
        await this.rankingRepository.actualizarRankingUsuario(ranking);
      return rankingActualizado;
    } catch (error) {
      throw new CustomError(
        "Error servicio al actualizar el ranking",
        500,
        error
      );
    }
  }

  async insertarVentaActualizarRanking(ranking) {
    try {
      const rankingActualizado =
        await this.rankingRepository.insertarVentaYActualizarRanking(ranking);
      return rankingActualizado;
    } catch (error) {
      throw new CustomError(
        "Error servicio al actualizar el ranking",
        500,
        "" + error
      );
    }
  }
}

