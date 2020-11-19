import Component from "./Component";
import db from "../../db/dbConnection";
import { INSERT_MOUNTING } from "./querys";

class Mounting_System extends Component {
  public id = "";
  constructor(public description: string, public cost: number) {
    super(description, cost);
  }
  save = () =>
    db
      .query(INSERT_MOUNTING, [this.description, this.cost])
      .then((res) => {
        return res.rows[0].id;
      })
      .catch((e) => {
        console.log(e);
        return null;
      });
}

export default Mounting_System;
