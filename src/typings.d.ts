// This represents a single performance. Use this to pass back and forth.
interface Performance {
  id: number;
  name: string;
  count: number;
  returnAllPerformances(): Array<Performance>;
  findByName(name: string): Performance;
  findById(id: number): Performance;
  addVote(): number;
  save(): boolean;
}

// These are the fields that should be present in the DB. Never used beyond the class.
interface DBPerformance {
  id: number;
  name: string;
  votes: number;
}