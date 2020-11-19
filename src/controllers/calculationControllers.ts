import { RequestHandler } from "express";
import Consumption from "../models/Quotation/Consumption";
import ErrorClass from "../Error/errorClass";

const DAILY_SOLAR_LIGHT = 5.0;
const EFFICIENCY = 0.95;
export const postCalculationConsumptions: RequestHandler = async (
  req,
  res,
  next
) => {
  const { quotationId, panel = 355, num_panel = 1, consumption } = req.body;

  console.log(panel, num_panel, consumption);
  try {
    let consumptions = [];
    let totalKw = 0;
    if (quotationId) {
      consumptions = await Consumption.getConsumptions(quotationId);
      totalKw = consumptions.reduce((acc, csp) => {
        return acc + csp.kw;
      }, 0);
    } else totalKw = +consumption * 6;

    const daily_generation = (totalKw / 360).toFixed(2);
    const calc_panel = (
      (+daily_generation * 1000) /
      (DAILY_SOLAR_LIGHT * panel)
    ).toFixed(2);
    const required_source = (num_panel * (panel / 1000)).toFixed(2);
    const daily_source_generation = (
      +required_source *
      DAILY_SOLAR_LIGHT *
      EFFICIENCY
    ).toFixed(2);
    const generation_percentage = (
      (+daily_source_generation / +daily_generation) *
      100
    ).toFixed(2);

    if (!quotationId) {
      req.body = { calc_panel: Math.ceil(+calc_panel) };
      return next();
    }

    return res.status(200).json({
      daily_generation,
      calc_panel,
      daily_source_generation,
      required_source,
      generation_percentage,
    });
  } catch (e) {
    const error = new ErrorClass(e.statusCode, e.message);
    next(error);
  }
};
