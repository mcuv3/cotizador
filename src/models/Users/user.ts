import db from "../../db/dbConnection";
import { ADD_USER } from "./querys";

export class User {
  constructor(
    public email: string,
    public name: string,
    private phone: number
  ) {
    this.email = email;
    this.name = name;
    this.phone = phone;
  }

  save = () =>
    db.query(ADD_USER, [this.email, this.name, this.phone]).then((res) => {
      return res.rows[0].id;
    });
}

export default User;
