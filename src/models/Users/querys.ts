export const CREATE =
  "INSERT INTO admin (email,password,name,lastname,role,phone,branch) VALUES($1,$2,$3,$4,$5,$6,$7)";
export const ADD_USER =
  "INSERT INTO user_data (email,name,phone) VALUES($1,$2,$3) RETURNING id;";
export const DELETE =
  "INSERT INTO admin (email,password,name,lastname) VALUES($1,$2,$3,$4)";
export const FIND_BY_EMAIL =
  "SELECT password,role,B.branch FROM admin A LEFT JOIN branch B ON A.branch = B.id where email=$1";
export const FIND_ADMIN = `SELECT * FROM admin WHERE email=$1`;
export const FIND_SELLERS =
  "SELECT name,lastname,email,B.branch FROM admin A INNER JOIN branch B ON A.branch=B.id WHERE A.email NOT IN ('admin@root.com');";

export const UPDATE =
  "INSERT INTO admin (email,password,name,lastname) VALUES($1,$2,$3,$4)";
