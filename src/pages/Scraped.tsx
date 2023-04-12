import React, { useEffect, useState } from 'react';
import { AxiosResponse } from 'axios';
import moment from 'moment';
import { getArticle, IServerData } from '../api/axiosAPI';
import Article from '../components/Article';
import { IArticle } from '../lib/interface/IArticle';
import { getDay, replaceWhiteSpace } from '../lib/common';
import { IApICondition, ICondition } from '../lib/interface/Icondition';
import useScrapedIds from '../hooks/useScrapedIds';
import BlankPage from './BlankPage';
import useScrapedCondition from '../hooks/useScrapedCondition';
import Loading from '../components/Loading';
import { toast } from 'react-toastify';

export default function Scraped() {
  const [articles, setArticles] = useState<Array<IArticle>>([]);
  const [page, setPage] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const { keyword, date, nation }: ICondition = useScrapedCondition();
  const { scrapedIds } = useScrapedIds();
  const [isInit, setIsinit] = useState<boolean>(true);

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

    if (scrapedIds.length === 1) {
      params.fq = `_id:("${scrapedIds.join(',')}")`;
    }

    if (scrapedIds.length > 1) {
      params.fq = `_id:(${scrapedIds
        .map((item, idx, original) => {
          if (idx === original.length - 1) {
            return `"${item}"`;
          } else {
            return `"${item}" OR `;
          }
        })
        .join('')})`;
    }

    // 키워드 set
    if (keyword !== '') {
      params.q = replaceWhiteSpace(keyword);
    }

    // 날짜 set
    if (date) {
      const formattedDate = moment(date).format('YYYY-MM-DD');
      params.fq += ` AND pub_date:("${formattedDate}")`;
    }

    // 선택된 국가가 1개일 경우
    if (nation.length === 1) {
      params.fq += ` AND glocations:("${nation[0].code}")`;
    }

    // 선택된 국가가 1개 이상일 경우
    if (nation.length > 1) {
      params.fq += ` AND glocations:(${nation
        .map((item, idx, original) => {
          if (idx === original.length - 1) {
            return `"${item.code}"`;
          } else {
            return `"${item.code}" OR `;
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
        if (error.response.status === 429) {
          toast(`😓 빈번한 요청으로 인해\n조회가 거부되었습니다.\n잠시 후 다시 시도해주세요.`, {
            className: 'my-toast',
            closeButton: false,
            autoClose: 2000,
            hideProgressBar: true,
          });
        }
        setLoading(false);
      });
  };

  useEffect(() => {
    if (!isInit) {
      getArticleFunc(false);
    }
  }, [page]);

  useEffect(() => {
    if (scrapedIds.length !== 0) {
      getArticleFunc(true);
    }
    setIsinit(false);
  }, [keyword, date, nation, scrapedIds]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="main">
      {scrapedIds.length === 0 && !loading && <BlankPage isNoScraped />}
      {scrapedIds.length > 0 && articles.length === 0 && !loading && <BlankPage isNoScraped={false} />}
      {scrapedIds.length > 0 &&
        articles.length > 0 &&
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
      {loading && <Loading />}
    </div>
  );
}
