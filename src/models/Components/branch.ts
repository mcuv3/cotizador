import { INSERT_BRANCH } from "./querys";
import db from "../../db/dbConnection";

class Branch {
  constructor(private branch: string) {
    this.branch = branch;
  }
  save = () =>
    db
      .query(INSERT_BRANCH, [this.branch])
      .then((res) => {
        return res.rows[0].id;
      })
      .catch((e) => {
        console.log(e);
        return null;
      });
}

export default Branch;
