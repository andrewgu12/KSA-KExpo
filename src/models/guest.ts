import { pool } from '../db/config';
import { Performance } from './performance';

export class Guest {
  private username     : string;
  private performances : Vote;
  private newEntry     : boolean;

  constructor(name: string) {
    this.username     = name;
    this.performances = null; // can't call async functions in constructor
  }

  // Build out map that holds performance information
  private static async prefillPerformances(): Promise<Vote> {
    try {
      const ids: number[] = await Performance.returnAllIds();
      const votes: Vote   = {};

      ids.forEach((id: number) => {
        votes[id] = false;
      });

      return Promise.resolve(votes);
    } catch (err) {
      throw err;
    }
  }

  get name() {
    return this.username;
  }

  set name(name: string) {
    this.username = name;
  }

  public async vote(id: number): Promise<boolean> {
    return null;
  }

  public voteCount(id: number): boolean {
    if (this.performances) {
      return this.performances[id];
    }
    return false;
  }

  // Save a new audiece member
  public async save(): Promise<boolean> {
    return Promise.resolve(false);
  }

  public async delete(): Promise<boolean> {
    return Promise.resolve(false);
  }

  public static async clearTable(): Promise<boolean> {
    return Promise.resolve(false);
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
