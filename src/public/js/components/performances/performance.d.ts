export default interface Performance {
  name:      string;
  id:        number;
  approval:  number;
  enabled:   boolean;
  imageName: string;
}

export interface PerformanceArray extends Array<Performance> {}
