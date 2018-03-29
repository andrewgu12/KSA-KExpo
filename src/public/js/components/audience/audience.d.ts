export interface ApprovalArray extends Array<boolean> {}

export default interface Audience {
  id: number;
  username: string;
  admin: boolean;
  performances: ApprovalArray;
}

export interface AudienceArray extends Array<Audience> {}
