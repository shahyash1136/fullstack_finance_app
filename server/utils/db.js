import pkg from "pg";
import dotenv from "dotenv";
dotenv.config({ path: "../config.env" });

const { Pool } = pkg;

const db = new Pool({
  user: process.env.PGUSER || "postgres",
  host: process.env.PGHOST || "localhost",
  database: process.env.PGDATABASE || "budget_app",
  password: process.env.PGPASSWORD || "admin",
  port: process.env.PGPORT || 5432,
});

export { db };
