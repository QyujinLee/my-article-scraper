import React from 'react';
import { IArticle } from '../lib/interface/IArticle';

export default function Article({ _id, headline, webUrl, source, author, pubDate }: IArticle) {
  /**
   * 기사 클릭 시 해당 기사 페이지로 리다이렉트
   * @param webUrl string
   */
  const handleClickHeadline = (webUrl: string) => {
    window.location.href = webUrl;
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
        <div className="scraped">
          <img className="star inactive" />
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
