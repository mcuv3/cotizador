import { Pool } from "pg";
import * as dotenv from "dotenv";
dotenv.config();

const connectionString = `postgres://USER:PASSWORD@HOST:5432/DATABASE`;

const pool = new Pool({
  connectionString: connectionString,
});

export default pool;
