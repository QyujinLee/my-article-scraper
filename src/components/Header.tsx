import React from 'react';
import usePopupType from '../hooks/usePopupType';

export default function Header() {
  const { showFilterPopup } = usePopupType();
  const handleShowFilter = () => {
    showFilterPopup();
  };

  return (
    <div className="header">
      <div className="categories">
        <div className="category inactive" onClick={handleShowFilter}>
          <img className="search-image" />
          <span>전체 헤드라인</span>
        </div>
        <div className="category inactive" onClick={handleShowFilter}>
          <img className="calendar-image" />
          <span>전체 날짜</span>
        </div>
        <div className="category inactive" onClick={handleShowFilter}>
          <span>전체 국가</span>
        </div>
      </div>
    </div>
  );
}
