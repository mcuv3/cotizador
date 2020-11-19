import { RequestHandler } from "express";
import { s3 } from "../db/aws-s3";
import { transporter } from "../db/sendEmail";
import ErrorClass from "../Error/errorClass";
import Component, {
  ComponentDashboard,
  kind,
} from "../models/Components/Component";
import ComponentDetails, {
  ComponentDetailsData,
  QuotationDetailsItem,
} from "../models/Components/Component_Details";
import { Constant_Components } from "../models/Components/constant_components";
import Inversor from "../models/Components/Inversor";
import Mounting_System from "../models/Components/Mounting_System";
import Solar_Panel, {
  DEFAULT_KW_PANEL,
} from "../models/Components/Solar_Panel";
import Constant, { Factor } from "../models/constant/Constant";
import Consumption from "../models/Quotation/Consumption";
import Quotation, { QuotationData } from "../models/Quotation/Quotation";
import Seller from "../models/Users/seller";
import User from "../models/Users/user";
import { moneyToDouble } from "../util/formatMoneyDouble";
import formatQuotations from "../util/formatQuotations";
import { createPDF } from "../util/makePDFCot";
const QUOTATIONS_PER_PAGE = 3; // how many quotations a page should have
const LIMIT_QUOTATIONS = 9; // how many qto's do i want to fetch, this should be grater
// or equal than QUOTATIONS_PER_PAGE
// to work

export const getQuotations: RequestHandler = async (req, res, next) => {
  const { role } = req.user;
  const { admin: adminEmail, grp: QUOTATION_GROUP } = req.params;

  try {
    const isAdmin = role === "admin";

    const { active, sent, maxActive, maxSent } = await Quotation.getQuotations(
      LIMIT_QUOTATIONS,
      LIMIT_QUOTATIONS * +QUOTATION_GROUP,
      !isAdmin ? adminEmail : null
    );

    const quotationsResponse = {
      activeQuotations: formatQuotations(active),
      sentQuotations: formatQuotations(sent),
      maxActivePages: Math.ceil(maxActive / QUOTATIONS_PER_PAGE),
      maxSentPages: Math.ceil(maxSent / QUOTATIONS_PER_PAGE),
    };

    if (!isAdmin) return res.status(200).json(quotationsResponse);
    const sellers = await Seller.getSellers();
    return res.status(200).json({
      ...quotationsResponse,
      sellers,
    });
  } catch (e) {
    const error = new ErrorClass(e.statusCode, e.message);
    next(error);
  }
};

export const getQuotationsSlim: RequestHandler = async (req, res, next) => {
  const { group: GROUP, kind, admin } = req.body;
  const { role } = req.user;
  const isAdmin = role === "admin";

  try {
    const extraQuotations = await Quotation.getQuotationSlim(
      LIMIT_QUOTATIONS,
      LIMIT_QUOTATIONS * +GROUP,
      kind,
      !isAdmin ? admin : null
    );

    res
      .status(200)
      .json({ extraQuotations: formatQuotations(extraQuotations) });
  } catch (e) {
    const error = new ErrorClass(e.statusCode, e.message);
    next(error);
  }
};

interface ComponentsDB {
  [props: string]: QuotationDetailsItem[];
}

export const getQuotation: RequestHandler = async (req, res, next) => {
  const { quotationId } = req.params;

  try {
    const consumptions = await Consumption.getConsumptions(+quotationId);
    const quotationData = await Quotation.getQuotationInfo(quotationId);
    const componentsQuotation = await ComponentDetails.getComponentDetailsData(
      quotationId
    );

    let components: ComponentsDB = {};
    if (componentsQuotation.length > 0)
      componentsQuotation.forEach((comp) => {
        if (!components[comp.kind]) components[comp.kind] = [comp];
        else components[comp.kind] = [...components[comp.kind], comp];
      });
    req.body = {
      quotationDetails: components,
      components,
      consumptions,
      quotationData,
      quotationId,
      save: false,
    };
    return next();
    //res.status(200).json({ consumptions, quotationData, quotationDetails });
  } catch (e) {
    const error = new ErrorClass(e.statusCode, e.message);
    next(error);
  }
};

interface Components {
  [props: string]: ComponentDashboard[];
}

const MAX_FACTOR_INVERSOR = 1.2;
const MIN_FACTOR_INVERSOR = 0.8;

export const getCalculations: RequestHandler = async (req, res, next) => {
  //TODO: also place the components in the component_details table
  const components: Components = req.body.components;
  const { save } = req.body;

  let quotation_id;
  if (save) {
    quotation_id = req.body.quotation_id; // only for saving components
    if (!quotation_id) quotation_id = req.params.quotationId; // only for saving components
  }

  try {
    let total = 0;
    let kw = 0;
    let panel_watts = 1;
    const factors = await Constant.getPriceFactors();
    const components_info = [];
    if (!factors) next(new ErrorClass(404, "NO FACTORS FOUND"));
    for (const compKey in components) {
      for (const comp of components[compKey]) {
        let component = await Component.getComponent(
          compKey,
          comp.component_id
        );
        if (!component) {
          // IF THERE IS NO COMPONENT IN THE TABLE
          // FALLBACK COMPONENT FIRST ONE
          component = await Component.getComponent(compKey);
        }
        const component_price =
          moneyToDouble(component.cost) *
          (factors[Factor.COMPONENT_GAIN] + 1) *
          factors[Factor.EXCHANGE];
        components_info.push({
          ...component,
          kind: compKey,
          price: component_price,
          qty: +comp.qty,
        });
        if (compKey == kind.INVERSOR) kw = component.capacity_kw;
        if (compKey == kind.SOLAR_PANEL) panel_watts = component.watts;

        total += +comp.qty * component_price;
      }
    }

    //CALCULATIONS WITHOUT ROUNDING
    const SUB_TOTAL =
      total *
      (factors[Factor.WORKFORCE] + 1) *
      (factors[Factor.GENERAL_GAIN] + 1);
    const IVA = SUB_TOTAL * factors[Factor.IVA];
    const WORK_FORCE = total * factors[Factor.WORKFORCE];
    const MAX_INVERSOR = kw * MAX_FACTOR_INVERSOR;
    const MIN_INVERSOR = kw * MIN_FACTOR_INVERSOR;
    const MAX_PANEL = (MAX_INVERSOR * 1000) / panel_watts;
    const MIN_PANEL = (MIN_INVERSOR * 1000) / panel_watts;

    const response = {
      WORKFORCE: `$${WORK_FORCE.toFixed(2)}`,
      WORKFORCE_PERCENTAGE: `${factors[Factor.WORKFORCE] * 100}%`,
      SUB_TOTAL: `$${SUB_TOTAL.toFixed(2)}`,
      IVA: `$${IVA.toFixed(2)}`,
      IVA_PERCENTAGE: `${factors[Factor.IVA] * 100}%`,
      TOTAL: `$${(IVA + SUB_TOTAL).toFixed(2)}`,
      configurations: {
        MAX_INVERSOR: MAX_INVERSOR.toFixed(2),
        MIN_INVERSOR: MIN_INVERSOR.toFixed(2),
        MAX_PANEL: MAX_PANEL.toFixed(2),
        MIN_PANEL: MIN_PANEL.toFixed(2),
      },
    };

    if (quotation_id) {
      req.body = {
        ...req.body,
        ...response,
        quotation_id,
        components_info,
      };
      return next();
    }

    return res.status(200).json({ ...response, ...req.body });
  } catch (e) {
    const error = new ErrorClass(e.statusCode, e.message);
    next(error);
  }
};

export const saveComponents: RequestHandler = async (req, res, next) => {
  const components_info: ComponentDetailsData[] = req.body.components_info;
  const { quotation_id, isSent } = req.body;

  try {
    const factors = await Constant.getPriceFactors();
    if (!factors) next(new ErrorClass(404, "NO FACTORS FOUND"));
    const component_details = new ComponentDetails(
      components_info,
      quotation_id
    );
    const components = await component_details.save();

    if (isSent) {
      req.body = { ...req.body, components };
      return next();
    }
    return res.status(200).json({ ...req.body });
  } catch (e) {
    const error = new ErrorClass(e.statusCode, e.message);
    next(e);
  }
};

export const sendQuotation: RequestHandler = async (req, res, next) => {
  const {
    branch,
    components_info,
    userData,
    quotation_id,
    SUB_TOTAL,
    IVA,
    TOTAL,
    WORKFORCE,
  } = req.body;

  try {
    const quotation_number = await Quotation.placeQuotation({
      branch,
      quotationId: quotation_id,
      total: TOTAL,
      iva: IVA,
      work_force: WORKFORCE,
    });
    // if (!qtoNumber)
    //   next(new ErrorClass(304, "CANNOT PLACE THE QUOTATION"));

    const quotationData: QuotationData = {
      branch,
      components_info,
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      quotation_id,
      SUB_TOTAL,
      WORKFORCE,
      IVA,
      TOTAL,
      quotation_number,
    };

    const storedPath = await createPDF(quotationData, res);

    await transporter.sendMail({
      from: "relay@wabiit.com",
      to: userData.email,
      subject: "Cotización Paneles Solares",
      html: `
          <h1>Gracias ${userData.name} por utilizar nuestro cotizador !!!</h1>
          <p>Aquí te adjuntamos el pdf con más detalles sobre tú cotización.Nuestro objetivo es brindarte el mejor servicio gracias 💓</p>
        `,
      attachments: [
        {
          filename: "Cotización.pdf",
          path: storedPath,
          contentType: "Content-Type: application/pdf",
        },
      ],
    });

    return res
      .status(201)
      .json({ success: true, message: "SUCCESSFULLY SENT" });
  } catch (e) {
    const error = new ErrorClass(e.statusCode || 500, e.message);
    return next(error);
  }
};

export const downloadQuotation: RequestHandler = async (req, res, next) => {
  const { quotationId } = req.params;
  try {
    var params = {
      Bucket: "solar-panel-s3",
      Key: `${quotationId}.pdf`,
    };

    const results = await new Promise<any>((resolve, reject) => {
      const fet = s3.getObject(params);
      fet
        .on("success", function (response) {
          resolve(response);
        })
        .send();
      fet.on("error", (err) => {
        reject(err);
        // res.status(302).json({ message: "CANNOT DOWNLOAD THE PDF" });
      });
    });
    res.send(results.data.Body);

    // console.log(results.data.Body);
  } catch (e) {
    next(new ErrorClass(e.statusCode, e.message));
  }
};
// function (response) {
//   if (err) next(new ErrorClass(304, "CANNOT DOWNLOAD THE QUOTATION"));
//   else {
//     res.setHeader("Content-Type", "application/octet-stream");
//     res.write(data.Body, "hex");
//     res.end(null, "hex");
//     // res.status(200).send(data.Body);
//   }
// }

export const slimQuotation: RequestHandler = async (req, _res, next) => {
  const { calc_panel } = req.body;
  try {
    const panel = await Solar_Panel.getTheDefault();

    const investors = await Component.getComponents<Inversor>(kind.INVERSOR);

    const constant_components = await Component.getComponents<
      Constant_Components
    >(kind.COMPONENT_CONSTANT);

    const mounting_system = await Component.getComponents<Mounting_System>(
      kind.MOUNTING_SYSTEM,
      true
    );

    let inversor;
    let qty_inversor;
    for (const inv of investors) {
      const MAX_INVERSOR = inv.capacity_kw * MAX_FACTOR_INVERSOR;
      const MAX_PANEL = (MAX_INVERSOR * 1000) / DEFAULT_KW_PANEL;
      if (MAX_PANEL >= +calc_panel) {
        qty_inversor = 1;
        inversor = inv;
        break;
      }
    }
    if (!inversor) {
      inversor = investors[0];
      qty_inversor = 2;
    }

    const components = {
      [kind.SOLAR_PANEL]: [{ qty: calc_panel, id: panel.id }],
      [kind.INVERSOR]: [{ qty: qty_inversor, id: inversor.id }],
      [kind.MOUNTING_SYSTEM]: [{ qty: 1, id: mounting_system[0].id }],
      [kind.COMPONENT_CONSTANT]: [
        { qty: 1, id: constant_components[0].id },
        { qty: 1, id: constant_components[1].id },
      ],
    };
    req.body = { components };
    next();
  } catch (e) {
    next(new ErrorClass(303, e.message));
  }
};

export const addQuotation: RequestHandler = async (req, res, next) => {
  const { consumptions, name, email, phone } = req.body;
  const user = new User(email, name, phone);
  try {
    const userId = await user.save();
    const quotationId = Math.floor(new Date().getTime() / 1000);
    const quotation = new Quotation(userId, quotationId);
    await quotation.save();
    req.body = { consumptions, quotationId, email, name };
    next();
  } catch (e) {
    const error = new ErrorClass(e.statusCode, e.message);
    next(error);
  }
};

export const assignQuotation: RequestHandler = async (req, res, next) => {
  const { seller } = req.body;
  const { quotationId } = req.params;

  try {
    await Quotation.assignQuotation(+quotationId, seller);
    res.status(200).json({ success: true });
  } catch (e) {
    const error = new ErrorClass(e.statusCode, e.message);
    next(error);
  }
};
export const cancelQuotation: RequestHandler = async (req, res, next) => {
  const { quotationId } = req.params;
  try {
    await Quotation.cancelAssignationQuotation(+quotationId);
    res.status(200).json({ success: true });
  } catch (e) {
    const error = new ErrorClass(e.statusCode, e.message);
    next(error);
  }
};
