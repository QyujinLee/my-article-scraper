import React, { useEffect, useState } from 'react';
import { AxiosResponse } from 'axios';
import moment from 'moment';
import { getArticle, IServerData } from '../../api/axiosAPI';
import Article from '../Article';
import { IArticle } from '../../lib/interface/IArticle';
import { getDay, replaceWhiteSpace } from '../../lib/common';
import useCondition from '../../hooks/useCondition';
import { IApICondition, ICondition } from '../../lib/interface/ICondition';
import useScrapedIds from '../../hooks/useScrapedIds';
import BlankPage from './BlankPage';

export default function Scraped() {
  const [articles, setArticles] = useState<Array<IArticle>>([]);
  const [page, setPage] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const { keyword, date, nation }: ICondition = useCondition();
  const { scrapedIds } = useScrapedIds();

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

  /**
   * api parameter set
   * @returns params
   */
  const getApiParams = () => {
    const params: IApICondition = {
      page,
    };

    // 키워드 set
    if (keyword !== '') {
      params.q = replaceWhiteSpace(keyword);
    }

    // 날짜 set
    if (date) {
      const formattedDate = moment(date).format('YYYYMMDD');
      params.begin_date = formattedDate;
      params.end_date = formattedDate;
    }

    // 선택된 국가가 1개일 경우
    if (nation.length === 1) {
      params.fq = `glocations:("${replaceWhiteSpace(nation[0].code)}")`;
    }

    // 선택된 국가가 1개 이상일 경우
    if (nation.length > 1) {
      params.fq = `glocations:(${nation
        .map((item, idx, original) => {
          if (idx === original.length - 1) {
            return `"${replaceWhiteSpace(item.code)}"`;
          } else {
            return `"${replaceWhiteSpace(item.code)}" OR `;
          }
        })
        .join('')})`;
    }

    return params;
  };

  /**
   * 기사 조회
   */
  const getArticleFunc = async (isConditionChange: boolean) => {
    setLoading(true);

    await getArticle(getApiParams())
      .then((response: AxiosResponse<IServerData>) => {
        if (isConditionChange) {
          // 검색 조건이 변경된 경우, 기존의 기사 목록을 초기화 하고 새로 조회된 기사의 목록을 set
          setArticles(
            response.data.response.docs.map((article) => ({
              id: article._id,
              headline: article.headline.main,
              webUrl: article.web_url,
              source: article.source,
              author: article.byline.original,
              pubDate: `${moment(article.pub_date).format('YYYY.MM.DD')} (${getDay(moment(article.pub_date).day())})`,
            }))
          );
        } else {
          // 페이지만 변경된 경우, 기존의 기사 목록 + 새로 조회된 기사 목록 set
          setArticles((prevArticles) => [
            ...prevArticles,
            ...response.data.response.docs.map((article) => ({
              id: article._id,
              headline: article.headline.main,
              webUrl: article.web_url,
              source: article.source,
              author: article.byline.original,
              pubDate: `${moment(article.pub_date).format('YYYY.MM.DD')} (${getDay(moment(article.pub_date).day())})`,
            })),
          ]);
        }

        setLoading(false);
      })
      .catch((error) => {
        console.error(`error : ${error}`);
        setLoading(false);
      });
  };

  useEffect(() => {
    getArticleFunc(false);
  }, [page]);

  useEffect(() => {
    getArticleFunc(true);
  }, [keyword, date, nation]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="main">
      {scrapedIds.length === 0 && <BlankPage />}
      {scrapedIds.length > 0 &&
        articles &&
        articles.map((article) => (
          <Article
            key={`${article.id}`}
            id={article.id}
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
