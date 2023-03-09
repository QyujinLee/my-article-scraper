import { IOriginArticle } from '../lib/interface/IArticle';
import { IApICondition } from '../lib/interface/ICondition';
import axios from './axiosInstance';

export interface IServerData {
  copyright: string;
  response: {
    docs: Array<IOriginArticle>;
    meta: {
      hits: number;
      offset: number;
      time: number;
    };
  };

  status: string;
}

/**
 * 기사 조회
 * @param params
 * @returns
 */
export const getArticle = (params: IApICondition) => {
  return axios.get<IServerData>(`/articlesearch.json`, { params });
};
