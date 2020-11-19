import db from "../../db/dbConnection";
import format from "pg-format";
import { kind } from "./Component";
import ErrorClass from "../../Error/errorClass";
const SAVE_COMPONENTS =
  "INSERT INTO quotation_details (quotation_id, component_id,component_kind,description,qty,price) VALUES %L";
const DELETE_COMPONENTS = "DELETE FROM quotation_details WHERE quotation_id=$1";
const GET_QUOTATION_DETAILS = `SELECT *  FROM quotation_details  A INNER JOIN component_kind B ON A.component_kind=B.id WHERE quotation_id=$1;`;
export interface ComponentDetailsData {
  id: string;
  description: string;
  price: number;
  qty: number;
  kind: string;
}

// Check the table component_kind for reference
// Made like this for facilites
export enum Component_Kind_ID {
  PANEL = 1,
  INVERSOR = 2,
  MOUNTING = 3,
  CONSTANT = 4,
}

export interface QuotationDetailsItem {
  quotation_id: string;
  component_id: string;
  kind: kind;
  description: string;
  qty: number;
  price: number;
}

class Component_Details {
  constructor(
    private components: Array<ComponentDetailsData>,
    private quotation_id: string
  ) {
    this.components = components;
    this.quotation_id = quotation_id;
  }
  // INSERT MANY RECORDS INTO COMPONENT_DETAILS
  save = async () => {
    try {
      await this.delete();
      const query = format(
        SAVE_COMPONENTS,
        this.mapComponentsToComponentDetailFormat()
      );
      return db.query(query).then((r) => r.rows);
    } catch (e) {
      const error = new ErrorClass(304, "CANNOT SAVE COMPONENTS");
      throw error;
    }
  };

  mapComponentsToComponentDetailFormat = () => {
    const componentsFormatead: Array<Array<string | number>> = [];
    this.components.forEach((comp) => {
      let component_kind_id;
      switch (comp.kind) {
        case kind.INVERSOR:
          component_kind_id = Component_Kind_ID.INVERSOR;
          break;
        case kind.SOLAR_PANEL:
          component_kind_id = Component_Kind_ID.PANEL;
          break;
        case kind.MOUNTING_SYSTEM:
          component_kind_id = Component_Kind_ID.MOUNTING;
          break;
        case kind.COMPONENT_CONSTANT:
          component_kind_id = Component_Kind_ID.CONSTANT;
          break;
      }
      if (component_kind_id)
        componentsFormatead.push([
          this.quotation_id,
          comp.id,
          component_kind_id,
          comp.description,
          comp.qty,
          comp.price,
        ]);
    });
    return componentsFormatead;
  };

  delete = () => db.query(DELETE_COMPONENTS, [this.quotation_id]);

  static getComponentDetailsData = (
    quotationId: string
  ): Promise<QuotationDetailsItem[]> =>
    db.query(GET_QUOTATION_DETAILS, [quotationId]).then((r) => r.rows);
}

export default Component_Details;
