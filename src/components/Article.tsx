import React from 'react';

export default function Article() {
  return (
    <div className="article">
      <div className="headline-box">
        <div className="headline">샘플 기사 제목입니다.</div>
        <div className="scraped">
          <img className="star inactive" />
        </div>
      </div>
      <div className="subline-box">
        <div className="author">
          <span className="newspaper">샘플일보</span>
          <span className="reporter">홍길동 기자</span>
        </div>
        <div className="reg-date">2023.03.08 (수)</div>
      </div>
    </div>
  );
}
