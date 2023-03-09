import axios, { AxiosInstance } from 'axios';
import qs from 'qs';

const instance: AxiosInstance = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
  baseURL: 'https://api.nytimes.com/svc/search/v2',
  params: { 'api-key': import.meta.env.VITE_MY_ARTICLE_SCRAPER_API_KEY },
  paramsSerializer: {
    serialize: (params: Record<string, any>): string => {
      return qs.stringify(params, { arrayFormat: 'repeat' });
    },
  },
});

export default instance;
