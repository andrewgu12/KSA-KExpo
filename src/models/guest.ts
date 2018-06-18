import { pool } from '../db/config';
import { Performance } from './performance';

export class Guest {
    private username     : string;
    private performances : Vote[];

    constructor(name: string) {
      this.username     = name;
      this.performances = null; // can't call async functions in constructor
    }

    // Build out map that holds performance information
    private static async prefillPerformances(): Promise<Vote> {
      return Promise.resolve(null);
    }

    // Make sure username is unique - not case sensitive
    // CALL BEFORE BUILDING OUT GUEST!
    public static async checkUsernameExists(name: string): Promise<boolean> {
      try {
        name = name.toLowerCase(); // not case sensitive
        const results = await pool.query('SELECT * FROM guest WHERE username = $1 LIMIT 1', [name]);
        if (results.rows.length) {
          return Promise.resolve(true);
        }
        return Promise.resolve(false);
      } catch (err) {
        throw err;
      }
    }

}
