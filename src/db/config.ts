import { Pool } from 'pg';

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.HOST || 'localhost',
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.PG_PORT || 5432
});

export const query = (text: String, params: Object, callback: Function) => {
  return pool.query(text, params, callback);
};