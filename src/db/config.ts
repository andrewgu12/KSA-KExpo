import { Pool } from 'pg';

const pool = new Pool({
  user     : process.env.POSTGRES_USER,
  host     : process.env.HOST || 'localhost',
  database : process.env.POSTGRES_DB,
  password : process.env.POSTGRES_PASSWORD,
  port     : parseInt(process.env.POSTGRES_PORT)  || 5432
});

export const query = (text: string, params: any[], callback: ((err: Error, res: any) => void)) => {
  return pool.query(text, params, callback);
};