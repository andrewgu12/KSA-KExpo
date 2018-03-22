export interface Approval {
  approval: boolean;
}

export interface ApprovalArray extends Array<Approval> {}

export default interface Audience {
  id: number;
  username: string;
  admin: boolean;
  performances: ApprovalArray;
}

export interface AudienceArray extends Array<Audience> {}