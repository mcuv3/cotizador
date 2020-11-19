import Component from "./Component";
import db from "../../db/dbConnection";
import { INSERT_PANEL } from "./querys";

export const DEFAULT_KW_PANEL = 355;

class Solar_Panel extends Component {
  constructor(
    description: string,
    cost: number,
    public watts: number,
    public dimension: number
  ) {
    super(description, cost);
    this.watts = watts;
    this.dimension = dimension;
  }
  save = () =>
    db
      .query(INSERT_PANEL, [
        this.description,
        this.watts,
        this.dimension,
        this.cost,
      ])
      .then((res) => {
        return res.rows[0].id;
      })
      .catch((e) => {
        console.log(e);
        return null;
      });
  static getTheDefault = () =>
    db
      .query(`SELECT * FROM solar_panel WHERE watts =$1`, [DEFAULT_KW_PANEL])
      .then((res) => res.rows[0]);
}

export default Solar_Panel;
