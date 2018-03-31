export default interface Performance {
  name:      string;
  id:        number;
  approval:  number;
  enabled:   boolean;
  imagename: string;
}

export interface PerformanceArray extends Array<Performance> {}
