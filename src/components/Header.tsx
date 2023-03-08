import React from 'react';

export default function Header() {
  return (
    <div className="header">
      <div className="categories">
        <div className="category inactive">
          <img className="search-image" />
          <span>전체 헤드라인</span>
        </div>
        <div className="category inactive">
          <img className="calendar-image" />
          <span>전체 날짜</span>
        </div>
        <div className="category inactive">
          <span>전체 국가</span>
        </div>
      </div>
    </div>
  );
}
