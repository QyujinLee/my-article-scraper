export interface ICondition {
  keyword: string;
  date?: string;
  nation: Array<{ name: string; code: string }>;
}

export interface IApICondition {
  q?: string;
  fq?: string;
  begin_date?: string;
  end_date?: string;
  page: number;
  'api-key'?: string;
}
