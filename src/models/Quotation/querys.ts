export const GET_QUOTATIONS = `SELECT quotation, qto_number, "admin", E.branch, B.name, B.email, B.phone,
 date, C.status
FROM quotation A INNER JOIN user_data B ON  A."user"=B.id INNER JOIN status C 
ON A.status =C.id INNER JOIN "admin" D ON A.admin=D.email LEFT JOIN branch E ON D.branch=E.id WHERE  C.status IN ($1,$2)  LIMIT $3 OFFSET $4
;`;
export const GET_QUOTATIONS_SELLER = `SELECT quotation, qto_number, "admin", E.branch, B.name, B.email, B.phone,
 date, C.status
FROM quotation A INNER JOIN user_data B ON  A."user"=B.id INNER JOIN status C 
ON A.status =C.id INNER JOIN "admin" D ON A.admin=D.email LEFT JOIN branch E ON D.branch=E.id WHERE  C.status IN ($1,$2) AND admin=$5 LIMIT $3 OFFSET $4 
;`;

export const GET_QUOTATION = `SELECT quotation,qto_number,branch_id,qty,total,date,B.name,B.email,B.phone,C.branch,D.status FROM quotation A INNER JOIN user_data B ON A.user = B.id INNER JOIN "admin" C ON C.email=A."admin" INNER JOIN "status" D ON D.id=A.status WHERE quotation=$1 `;

export const ADD_QUOTATION = `INSERT INTO quotation (quotation,admin,"user",qty,total,date,status)
                            VALUES($1,$2,$3,$4,$5,$6,$7)`;
export const ADD_CONSUMPTION =
  "INSERT INTO consume (quotation_id,bimester,num_measure,kw,cost) VALUES($1,$2,$3,$4,$5);";

export const DELETE_CONSUMPTION = "DELETE FROM consume WHERE quotation_id=$1";

export const ASSIGN_QUOTATION =
  "UPDATE  quotation SET admin=$1, status=3 WHERE quotation=$2 ";
export const CANCEL_QUOTATION =
  "UPDATE  quotation SET admin='admin@root.com', status=1 WHERE quotation=$1 ";

export const MAX_QUOTATIONS = `SELECT count(*) as max,B.status FROM quotation A INNER JOIN status B ON A.status=B.id  GROUP BY B.status;`;
export const MAX_QUOTATIONS_SELLER = `SELECT count(*) as max,B.status FROM quotation A INNER JOIN status B ON A.status=B.id WHERE admin=$1 GROUP BY B.status ;`;

export const GET_CONSUMPTIONS = `SELECT *  FROM consume WHERE quotation_id=$1 ORDER BY num_measure,bimester;`;
