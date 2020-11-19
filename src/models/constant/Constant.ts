import db from "../../db/dbConnection";
import { GET_FACTORS } from "./querys";

export enum Factor {
  COMPONENT_GAIN = "Ganancia Por Componente",
  GENERAL_GAIN = "Ganancia General",
  EXCHANGE = "Tipo de Cambio",
  IVA = "IVA",
  WORKFORCE = "Mano de Obra",
}

interface Factors {
  [prop: string]: number;
}

export default class Constant {
  static getPriceFactors = async (): Promise<Factors> => {
    const data = await db.query(GET_FACTORS).then((r) => r.rows);
    const factors: Partial<Factors> = {};
    data.forEach((i) => (factors[i.description] = i.value));
    return factors as Factors;
  };
}
