import { Pool } from 'pg';
import * as env from 'env-var';

const pool = new Pool({
  user     : env.get('POSTGRES_USER').required(),
  host     : env.get('HOST') || 'localhost',
  database : env.get('POSTGRES_DB').required(),
  password : env.get('POSTGRES_PASSWORD').required(),
  port     : env.get('POSTGRES_PORT').asIntPositive() || 5432
});

export const query = (text: string, params: any[], callback: ((err: Error, res: any) => void)) => {
  return pool.query(text, params, callback);
};