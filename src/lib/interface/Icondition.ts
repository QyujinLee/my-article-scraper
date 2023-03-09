export interface ICondition {
  keyword?: string;
  date?: string;
  nation?: string[];
}

export interface IApICondition {
  fq?: string;
  'api-key'?: string;
  page: number;
}
