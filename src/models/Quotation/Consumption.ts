import {
  ADD_CONSUMPTION,
  DELETE_CONSUMPTION,
  GET_CONSUMPTIONS,
} from "./querys";
import db from "../../db/dbConnection";
export interface ConsumptionItem {
  quotation_id: number;
  num_measure: number;
  kw: string;
  cost: string;
}

class Consumption {
  constructor(
    private consumptions: Array<ConsumptionItem>,
    private quotationId: number
  ) {
    this.consumptions = consumptions;
    this.quotationId = quotationId;
  }

  saveConsumptions = async () =>
    new Promise((resolve, reject) => {
      this.consumptions.forEach(async (cs, index) => {
        try {
          await db.query(ADD_CONSUMPTION, [
            this.quotationId,
            index + 1 - (cs.num_measure - 1) * 6,
            cs.num_measure,
            cs.kw,
            cs.cost,
          ]);
        } catch (e) {
          console.log(e);
          reject(e.message);
        }
      });
      return resolve(true);
    });

  static editConsumptions = async (
    Consumptions: Array<ConsumptionItem>,
    quotationId: number
  ) => {
    await db.query(DELETE_CONSUMPTION, [quotationId]);
    const newConsumptions = new Consumption(Consumptions, quotationId);
    await newConsumptions.saveConsumptions();
    return Promise.resolve();
  };

  static getConsumptions = (quotationId: number) =>
    db.query(GET_CONSUMPTIONS, [quotationId]).then((res) => res.rows);
}

export default Consumption;
