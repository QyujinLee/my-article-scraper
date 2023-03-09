import React, { useEffect, useState } from 'react';
import { AxiosResponse } from 'axios';
import moment from 'moment';
import { getArticle, IServerData } from '../../api/axiosAPI';
import Article from '../Article';
import { IArticle } from '../../lib/interface/IArticle';
import { getDay } from '../../lib/common';

export default function Home() {
  const [articles, setArticles] = useState<Array<IArticle>>([]);
  const [page, setPage] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  /**
   * 스크롤 감지
   */
  const handleScroll = (): void => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight - 5 && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    setLoading(true);
    getArticle({
      'api-key': import.meta.env.VITE_MY_ARTICLE_SCRAPER_API_KEY,
      page,
    })
      .then((response: AxiosResponse<IServerData>) => {
        setArticles((prevArticles) => [
          ...prevArticles,
          ...response.data.response.docs.map((article) => ({
            _id: article._id,
            headline: article.headline.main,
            webUrl: article.web_url,
            source: article.source,
            author: article.byline.original,
            pubDate: `${moment(article.pub_date).format('YYYY.MM.DD')} (${getDay(moment(article.pub_date).day())})`,
          })),
        ]);
        setLoading(false);
      })
      .catch((error) => {
        console.log(`error : ${error}`);
        setLoading(false);
      });
  }, [page]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="main">
      {articles &&
        articles.map((article) => (
          <Article
            key={`${article._id}_${page}`}
            _id={article._id}
            headline={article.headline}
            webUrl={article.webUrl}
            source={article.source}
            author={article.author}
            pubDate={article.pubDate}
          />
        ))}
      {loading && <p className="loading">Loading...</p>}
    </div>
  );
}
