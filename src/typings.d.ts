// This represents a single performance. Use this to pass back and forth.
interface Performance {
  _id             : number;
  performanceName : string;
  count           : number;
  imageName       : string;
  newEntry        : boolean;
  returnAllPerformances(): Promise<Performance[]>;
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
  performances : Vote[];
  prefillPerformances(): Promise<Vote[]>;
  checkUsernameExists(name: string): Promise<boolean>;
}

interface DBGuest {
  username     : string;
  performances : object; // a JSON object!
}
