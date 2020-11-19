import { RequestHandler } from "express";
import { transporter } from "../db/sendEmail";
import ErrorClass from "../Error/errorClass";
import Consumption from "../models/Quotation/Consumption";
import { moneyToDouble } from "../util/formatMoneyDouble";

export const addConsumptions: RequestHandler = async (req, res, next) => {
  const { consumptions, quotationId, email, name } = req.body;
  try {
    const consumption = new Consumption(consumptions, quotationId);
    await consumption.saveConsumptions();
    transporter.sendMail({
      from: "relay@wabiit.com",
      to: email,
      subject: "Cotización Paneles Solares",
      html: `
          <h1>Gracias ${name} por utilizar nuestro cotizador de paneles solares !!!</h1>
          <p>Estamos en proceso de realizar tú cotización, te notificaremos cuando este lista gracias. 💓</p>
        `,
    });
    res.status(200).json({ quotationId });
  } catch (e) {
    const error = new ErrorClass(e.statusCode, e.message);
    next(error);
  }
};
export const editConsumptions: RequestHandler = async (req, res, next) => {
  const { quotationId } = req.params;
  const { consumptions } = req.body;
  try {
    await Consumption.editConsumptions(consumptions, +quotationId);
    res.status(200).json({ success: true });
  } catch (e) {
    const error = new ErrorClass(e.statusCode, e.message);
    next(error);
  }
};
export const getConsumptions: RequestHandler = async (req, res, next) => {
  const { quotationId } = req.params;
  try {
    const consumptions = await Consumption.getConsumptions(+quotationId);

    res.status(200).json({
      consumptions: consumptions.map((csp) => {
        csp.cost = moneyToDouble(csp.cost);
        return csp;
      }),
    });
  } catch (e) {
    const error = new ErrorClass(e.statusCode, e.message);
    next(error);
  }
};
