// SOLAR PANEL
export const INSERT_PANEL =
  "INSERT INTO solar_panel(description,watts,dimension,cost) VALUES($1,$2,$3,$4) RETURNING id;";
export const UPDATE_PANEL =
  "UPDATE solar_panel SET  description=$2, watts = $3,dimension=$4,cost=$5  WHERE id = $1";
// INVERSOR
export const INSERT_INVERSOR =
  "INSERT INTO inversor(description,capacity_kw,cost) VALUES($1,$2,$3) RETURNING id;";
export const UPDATE_INVERSOR =
  "UPDATE inversor SET description=$2, capacity_kw = $3,cost=$4  WHERE id = $1;";
// MOUNTING SYSTEM
export const INSERT_MOUNTING =
  "INSERT INTO mounting_system(description,cost) VALUES($1,$2) RETURNING id;";
export const UPDATE_MOUNTING =
  "UPDATE mounting_system SET  description=$2,cost=$3 WHERE id = $1";
// CONSTANT COMPONENT
export const UPDATE_COMPONENT_CONSTANT =
  "UPDATE component_constant SET  description=$2, cost = $3 WHERE id = $1";
// GENERAL CONSTANT
export const UPDATE_CONSTANT =
  "UPDATE constant SET  description=$2, value = $3 WHERE id = $1";
//BRANCH
export const INSERT_BRANCH =
  "INSERT INTO branch (branch) VALUES($1) RETURNING id;";
export const UPDATE_BRANCH = "UPDATE branch SET branch=$2 WHERE id=$1";

export const GET_COMPONENT = `SELECT * FROM $1 WHERE id=$2`;
