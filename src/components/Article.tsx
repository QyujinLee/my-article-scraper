import React from 'react';
import useScrapedIds from '../hooks/useScrapedIds';
import { IArticle } from '../lib/interface/IArticle';

export default function Article({ id, headline, webUrl, source, author, pubDate }: IArticle) {
  const { scrapedIds, scrapId, removeScrapedId } = useScrapedIds();

  /**
   * 기사 클릭 시 해당 기사 페이지로 리다이렉트
   * @param webUrl string
   */
  const handleClickHeadline = (webUrl: string) => {
    window.location.href = webUrl;
  };

  /**
   * 스크랩 버튼 클릭 시 이벤트
   * @param id
   */
  const handleClickScrap = (id: string) => {
    if (scrapedIds.includes(id)) {
      removeScrapedId(id);
    } else {
      scrapId(id);
    }
  };

  return (
    <div className="article">
      <div className="headline-box">
        <div
          className="headline"
          onClick={() => {
            handleClickHeadline(webUrl);
          }}
        >
          {headline}
        </div>
        <div className="scraped" onClick={() => handleClickScrap(id)}>
          <img className={`star ${scrapedIds.includes(id) ? 'active' : 'inactive'}`} />
        </div>
      </div>
      <div className="subline-box">
        <div className="author">
          <span className="newspaper">{source}</span>
          <span className="reporter">{author}</span>
        </div>
        <div className="reg-date">{pubDate}</div>
      </div>
    </div>
  );
}
