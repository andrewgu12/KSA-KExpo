export default interface Performance {
  name: string;
  id: number;
  approval: number;
  enabled: boolean;
}

export interface PerformanceArray extends Array<Performance> {}