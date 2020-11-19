import Component from "./Component";
import { INSERT_INVERSOR } from "./querys";
import db from "../../db/dbConnection";

export interface _Inversor {
  id: string;
  description: string;
  capacity_kw: number;
}

class Inversor extends Component {
  public id = "";
  constructor(description: string, cost: number, public capacity_kw: number) {
    super(description, cost);
    this.capacity_kw = capacity_kw;
  }
  save = () =>
    db
      .query(INSERT_INVERSOR, [this.description, this.capacity_kw, this.cost])
      .then((res) => {
        return res.rows[0].id;
      })
      .catch((e) => {
        console.log(e);
        return null;
      });
}

export default Inversor;
