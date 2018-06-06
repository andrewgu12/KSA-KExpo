import * as db from '../db/config';

// TODO: none of the find functions actually work! filler until DB has results

export class Performance {
  private id: number;
  private performanceName: string;
  private count: number;
  private imageName: string;

  // Create a new performance object
  constructor(name: string) {
    this.performanceName = name;
    this.count = 0;
    this.imageName = this.performanceName.toLowerCase().replace(/ /, '_');
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

  // set and change name(?) - guess we can use the ID to index
  set name(name: string) {
    this.performanceName = name;
  }

  get name() {
    return this.performanceName;
  }

  // Search for performance by name
  public static findByName(name: string): Performance {
    db.query('SELECT * FROM performances WHERE name = $1', [name], (err: any, res: any) => {
      if (err) {
        return null;
      } else {
        if (!res.res) {
          return null;
        } else {
          const perf = new Performance(res.name);
          perf.votes = res.votes;
          return perf;
        }
      }
    });
    return null;
  }

  // Search for performance by ID
  public static findById(id: number): Performance {
    db.query('SELECT * FROM performances WHERE id = $1', [id], (err: any, res: any) => {
      if (err) {
        return null;
      }
    });
    return null;
  }

  // Add a single vote & returns total number of votes
  public addVote(): number {
    this.count += 1;
    return this.count;
  }

  public subtractVote(): number {
    this.count -= 1;
    return this.count;
  }

  public clearVotes(): void {
    this.count = 0;
  }

  public save(): boolean {
    return false;
  }

}