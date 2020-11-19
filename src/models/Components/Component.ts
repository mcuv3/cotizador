import Solar_Panel from "./Solar_Panel";
import Mounting_System from "./Mounting_System";
import Inversor from "./Inversor";
import db from "../../db/dbConnection";
import {
  UPDATE_COMPONENT_CONSTANT,
  UPDATE_INVERSOR,
  UPDATE_MOUNTING,
  UPDATE_PANEL,
  UPDATE_CONSTANT,
  UPDATE_BRANCH,
  GET_COMPONENT,
} from "./querys";
import ErrorClass from "../../Error/errorClass";

export interface ComponentDashboard {
  component_id: string;
  qty: number;
}

export enum kind {
  INVERSOR = "inversor",
  SOLAR_PANEL = "solar_panel",
  MOUNTING_SYSTEM = "mounting_system",
  CONSTANT = "constant",
  COMPONENT_CONSTANT = "component_constant",
  BRANCH = "branch",
}
type ID = string;

abstract class Component {
  protected id = "";
  constructor(protected description: string, protected cost: number) {
    this.cost = cost;
    this.description = description;
  }

  abstract save(): Promise<ID | null>;

  static getComponents = <T>(comp: kind, firstOne?: boolean) =>
    db
      .query(`SELECT * FROM  ${comp} ${firstOne && `LIMIT 1`}`)
      .then((res) => res.rows) as Promise<Array<T>>;

  static getComponent = (table: string, id?: string) =>
    db
      .query(`SELECT * FROM ${table} ${id ? `WHERE id=${id}` : ""}`)
      .then((r) => r.rows[0]);

  static deleteComponent = (
    table: string,
    id: string
  ): Promise<true | false> => {
    return db
      .query(`DELETE FROM ${table} WHERE id=${id}`)
      .then((_res) => true)
      .catch((e) => {
        console.log(e);
        return false;
      });
  };
  static updateComponent = (
    componentKind: string,
    component: object
  ): Promise<true | false> => {
    let query;
    switch (componentKind) {
      case kind.SOLAR_PANEL:
        query = UPDATE_PANEL;
        break;
      case kind.INVERSOR:
        query = UPDATE_INVERSOR;
        break;
      case kind.MOUNTING_SYSTEM:
        query = UPDATE_MOUNTING;
        break;
      case kind.CONSTANT:
        query = UPDATE_CONSTANT;
        break;
      case kind.COMPONENT_CONSTANT:
        query = UPDATE_COMPONENT_CONSTANT;
        break;
      case kind.BRANCH:
        query = UPDATE_BRANCH;
    }
    if (!query) throw new ErrorClass(404, "NOT SUCH A COMPONENT KIND");

    const fields: string[] = [];

    for (let [_key, value] of Object.entries(component)) fields.push(value);
    return db
      .query(query, fields)
      .then((_res) => true)
      .catch((e) => {
        console.log(e);
        return false;
      });
  };
}

export default Component;
