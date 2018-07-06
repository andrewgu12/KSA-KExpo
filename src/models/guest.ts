import { pool } from '../db/config';
import { Performance } from './performance';
import { generateRandomString } from '../helpers/generate-random-string';
import * as crypto from 'crypto';

export class Guest {
  private username     : string;
  private performances : Vote;     // keep track of how the user voted
  private newEntry     : boolean;  // determine if update DB or create new entry
  private password     : string;
  private salt         : string;

  constructor(name: string, pass: string, generatePassHash: boolean = true) {
    this.username     = name;
    this.performances = null;  // can't call async functions in constructor
    this.newEntry     = true;
    if (generatePassHash) {
      this.generatePassword(pass);
    }
  }

  // Build out map that holds performance information
  private static async prefillPerformances(): Promise<Vote> {
    try {
      const ids:   number[] = await Performance.returnAllIds();
      const votes: Vote     = {};

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

  private generatePassword(pass: string): void {
    this.salt     = generateRandomString(60);
    this.password = crypto.createHash('sha256').update(this.salt + pass).digest('hex');
  }

  public async vote(id: number): Promise<boolean> {
    // make sure performances map isn't null!
    if (!this.performances) {
      try {
        this.performances = await Guest.prefillPerformances();
      } catch (err) {
        throw err;
      }
    }

    if (this.performances.hasOwnProperty(id)) {
      this.performances[id] = (this.performances[id]) ? false : true;
      return Promise.resolve(true); // just means its succeeded
    }

    // failed b/c likely the ID doesn't exist
    return Promise.resolve(false);
  }

  public voteCount(id: number): boolean {
    if (this.performances && this.performances.hasOwnProperty(id)) {
      return this.performances[id];
    }
    return false;
  }

  // Save a new audiece member
  public async save(): Promise<boolean> {
    if (this.newEntry) {
      if (!this.performances) {
        this.performances = await Guest.prefillPerformances();
      }
      try {
        await pool.query('INSERT INTO guest(username, performances, password, salt) VALUES($1, $2, $3, $4)', [this.username, this.performances, this.password, this.salt]);
        return Promise.resolve(true);
      } catch (err) {
        throw err;
      }
    } else {
      try {
        await pool.query('UPDATE guest SET performances = $1, password = $2, salt = $3 WHERE username = $4', [this.performances, this.password, this.salt, this.username]);
        return Promise.resolve(true);
      } catch (err) {
        throw err;
      }
    }
  }

  public async delete(): Promise<boolean> {
    try {
      await pool.query('DELETE FROM guest WHERE username = $1', [this.username]);
      return Promise.resolve(true);
    } catch (err) {
      throw err;
    }
  }

  public static async clearTable(): Promise<boolean> {
    try {
      await pool.query('DELETE FROM guest', []);
      return Promise.resolve(true);
    } catch (err) {
      throw err;
    }
  }

  // Test if the passed in password is valid
  public validPassword(pass: string): boolean {
    if (this.salt) {
      const testPass = crypto.createHash('sha256').update(this.salt + pass).digest('hex');
      debugger;
      if (testPass === this.password) {
        return true;
      }
    }
    return false;
  }

  // Make sure username is unique - not case sensitive
  // CALL BEFORE BUILDING OUT GUEST!
  public static async findOne(name: string): Promise<Guest> {
    try {
      const results = await pool.query('SELECT * FROM guest WHERE username = $1 LIMIT 1', [name]);
      if (results.rows.length) {
        const dbguest: DBGuest = results.rows[0];
        const guest            = new Guest(dbguest.username, dbguest.password, false);
        guest.salt             = dbguest.salt;
        guest.password         = dbguest.password;
        guest.performances     = dbguest.performances;
        guest.newEntry         = false;
        return Promise.resolve(results.rows[0]);
      }
      return Promise.resolve(null);
    } catch (err) {
      throw err;
    }
  }
}
