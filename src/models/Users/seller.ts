import db from "../../db/dbConnection";
import {
  CREATE,
  DELETE,
  FIND_BY_EMAIL,
  FIND_SELLERS,
  FIND_ADMIN,
} from "./querys";

class User {
  role: Number;
  constructor(
    public email: string,
    private password: string,
    public name: string,
    public lastName: string,
    private phone: number,
    private branch: number
  ) {
    this.email = email;
    this.password = password;
    this.name = name;
    this.lastName = lastName;
    this.phone = phone;
    this.branch = branch;
    this.role = 2; // 2 means SELLER
  }

  save = () =>
    db.query(CREATE, [
      this.email,
      this.password,
      this.name,
      this.lastName,
      this.role,
      this.phone,
      this.branch,
    ]);

  static delete = (id: String) => db.query(DELETE, [id]);

  static getSellers = () => db.query(FIND_SELLERS).then((res) => res.rows);

  static findByEmail = (email: string) =>
    db.query(FIND_BY_EMAIL, [email]).then((res) => res.rows[0]);
}

export default User;
