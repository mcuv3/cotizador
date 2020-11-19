import { Pool } from "pg";
import * as dotenv from "dotenv";
dotenv.config();

const connectionString = `postgres://wabi_solutions:g}$Nt$&}We8X={Te@solar-panel.cj5z9sp8a9ui.us-east-2.rds.amazonaws.com:5432/system_panel`;

const pool = new Pool({
  connectionString: connectionString,
});

export default pool;
