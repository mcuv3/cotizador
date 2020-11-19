import db from "../../db/dbConnection";
import {
  ADD_QUOTATION,
  MAX_QUOTATIONS_SELLER,
  GET_QUOTATIONS,
  GET_QUOTATIONS_SELLER,
  ASSIGN_QUOTATION,
  CANCEL_QUOTATION,
  MAX_QUOTATIONS,
  GET_QUOTATION,
} from "./querys";
import { ComponentDetailsData } from "../Components/Component_Details";

export interface QuotationData {
  quotation_id: number;
  quotation_number: number;
  email: string;
  name: string;
  phone: string;
  branch: String | null;
  components_info: ComponentDetailsData[];
  IVA: string;
  TOTAL: string;
  SUB_TOTAL: string;
  WORKFORCE: string;
}

export interface Qts {
  quotation: number;
  qto_number: number;
  branch: string;
  admin: string;
  status: string;
  date: Date;
}

export enum state {
  PENDIENTE = "PENDIENTE",
  ASIGNADO = "ASIGNADO",
  ENVIADO = "ENVIADO",
}

interface quotationSentInfo {
  quotationId: number;
  iva: string;
  total: string;
  work_force: string;
  branch: string;
}

class Quotation {
  private admin: string;
  private qty: number;
  private total: number;
  private date: string;
  private status: number;
  constructor(private user: number, private quotation: number) {
    this.quotation = quotation;
    this.user = user;
    this.admin = "admin@root.com";
    this.qty = 1;
    this.total = 0;
    this.date = new Date().toLocaleDateString();
    this.status = 1;
  }

  save = () =>
    db.query(ADD_QUOTATION, [
      this.quotation,
      this.admin,
      this.user,
      this.qty,
      this.total,
      this.date,
      this.status,
    ]);

  static getQuotations = async (
    limit: number,
    offset: number,
    emailAdmin: string | null
  ): Promise<{
    active: Array<Object>;
    sent: Array<Object>;
    maxActive: number;
    maxSent: number;
  }> => {
    const activeParams: Array<string | number> = [
      state.PENDIENTE,
      state.ASIGNADO,
      limit,
      offset,
    ];
    const sentParams = [state.ENVIADO, "", limit, offset];
    if (emailAdmin) {
      sentParams.push(emailAdmin);
      activeParams.push(emailAdmin);
    }

    const activeQts = db
      .query(emailAdmin ? GET_QUOTATIONS_SELLER : GET_QUOTATIONS, activeParams)
      .then((res) => res.rows);
    const sentQts = db
      .query(emailAdmin ? GET_QUOTATIONS_SELLER : GET_QUOTATIONS, sentParams)
      .then((res) => res.rows);
    const maxQts = db
      .query(
        emailAdmin ? MAX_QUOTATIONS_SELLER : MAX_QUOTATIONS,
        emailAdmin ? [emailAdmin] : []
      )
      .then((res) => res.rows);
    const res = await Promise.all([activeQts, sentQts, maxQts]);

    return Promise.resolve({
      active: res[0],
      sent: res[1],
      maxActive: res[2].reduce((acc, i) => {
        if (
          i.status.trim() === state.PENDIENTE ||
          i.status.trim() === state.ASIGNADO
        )
          return acc + +i?.max;
        else return acc;
      }, 0),
      maxSent:
        +res[2].find((i) => i.status === state.ENVIADO && i?.max)?.max || 0,
    });
  };

  static getQuotationSlim = (
    limit: number,
    offset: number,
    kind: string,
    emailAdmin: string | null
  ) => {
    console.log(kind);
    const qtoParams: Array<string | number> = [
      ...(kind === "activeQuotations"
        ? [state.ASIGNADO, state.PENDIENTE]
        : [state.ENVIADO, ""]),
      limit,
      offset,
    ];
    if (emailAdmin) {
      qtoParams.push(emailAdmin);
    }

    return db
      .query(emailAdmin ? GET_QUOTATIONS_SELLER : GET_QUOTATIONS, qtoParams)
      .then((res) => res.rows);
  };

  static getQuotationInfo = (quotationId: string) =>
    db.query(GET_QUOTATION, [quotationId]).then((r) => r.rows[0]);
  static assignQuotation = (quotationId: number, emailAdmin: string) =>
    db.query(ASSIGN_QUOTATION, [emailAdmin, quotationId]);
  static cancelAssignationQuotation = (quotationId: number) =>
    db.query(CANCEL_QUOTATION, [quotationId]);

  static placeQuotation = async ({
    iva,
    quotationId,
    total,
    work_force,
    branch,
  }: quotationSentInfo): Promise<number> => {
    const quotationNumber = (await db
      .query(getCountBranchesQuotations, [branch])
      .then((r) => r.rows[0].count)) as number;
    const branchId = await db
      .query("SELECT id FROM branch WHERE branch =$1;", [branch])
      .then((r) => r.rows[0].id);
    await db
      .query(updateQuotationSent, [
        +quotationNumber + 1,
        total,
        iva,
        work_force,
        quotationId,
        branchId,
      ])
      .catch((e) => {
        console.log(e);
        return false;
      });
    return +quotationNumber + 1;
  };
}

const getCountBranchesQuotations =
  "SELECT count(*) FROM quotation A INNER JOIN branch B ON A.branch_id=B.id WHERE B.branch=$1 ;";

const updateQuotationSent =
  "UPDATE quotation SET qto_number=$1,total=$2,iva=$3,work_force=$4,branch_id=$6,status=2 WHERE quotation=$5;";

export default Quotation;
