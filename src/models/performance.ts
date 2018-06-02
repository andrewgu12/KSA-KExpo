import * as db from '../db/config';

export class Performance {
  private id: number;
  private name: string;
  private count: number;

  // Create a new performance object
  constructor(name: string) {
    this.name = name;
    this.count = 0;
  }

  // Return all performances given in the database
  public static returnAllPerformances(): Performance[] {
    db.query('SELECT * FROM performances', [], (err: Error, result: any): Performance[] => {
      if (err) {
        console.log(err);
        return [];
      } else {
        const performances: Performance[] = [];
        result.forEach((res: DBPerformance) => {
          const single = new Performance(res.name);
          single.count = res.votes;
          performances.push(single);
        });
        return performances;
      }
    });
    return [];
  }

  // This should only be used when building out from DB.
  set votes(numberVotes: number) {
    this.count = numberVotes;
  }

  get votes() {
    return this.count;
  }

  // Search for performance by name
  public static findByName(name: string): Performance {
    return null;
  }

  // Search for performance by ID
  public static findById(id: number): Performance {
    return null;
  }

  // Add a single vote & returns total number of votes
  public addVote(): number {
    this.count += 1;
    return this.count;
  }

  public save(): boolean {
    return false;
  }

}