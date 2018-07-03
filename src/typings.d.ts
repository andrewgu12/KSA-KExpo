// This represents a single performance. Use this to pass back and forth.
interface Performance {
  _id             : number;
  performanceName : string;
  count           : number;
  imageName       : string;
  newEntry        : boolean;
  returnAllPerformances(): Promise<Performance[]>;
  returnAllIds(): Promise<number[]>;
  findByName(name: string): Promise<Performance>;
  findById(id: number): Promise<Performance>;
  addVote(): number;
  subtractVote(): number;
  clearVotes(): void;
  getTop(places: number): Promise<Performance[]>;
  save(): Promise<boolean>;
  delete(): Promise<boolean>;
  clearTable(): Promise<boolean>;
}

// These are the fields that should be present in the DB. Never used beyond the class.
interface DBPerformance {
  id         : number;
  name       : string;
  votes      : number;
  image_file : string;
}

// A single vote -> id of performance and a true/false (like/dislike)
interface Vote {
  [id: number]: boolean;
}

// For a guest who applies to vote
interface Guest {
  username     : string;
  password     : string; //nothing too complicated, but still needs to be salted
  salt         : string;
  newEntry     : boolean;
  performances : Vote;
  prefillPerformances(): Promise<Vote>;
  vote(id: number): Promise<boolean>;
  voteCount(id: number): boolean;
  findOne(name: string): Promise<DBGuest>;
  save(): Promise<boolean>;
  delete(): Promise<boolean>;
  clearTable(): Promise<boolean>;
}

interface DBGuest {
  username     : string;
  password     : string; // leave this in place, but think through this
  salt         : string;
  performances : Vote;
}
