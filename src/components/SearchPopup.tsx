import React, { useEffect } from 'react';
import usePopupType from '../hooks/usePopupType';

export default function SearchPopup() {
  const { hideFilterPopup } = usePopupType();

  /**
   * 딤드 클릭 시 팝업 닫기
   */
  const handleClickDimmed = () => {
    hideFilterPopup();
  };

  // 팝업 열린 후에 스크롤 방지
  useEffect(() => {
    document.body.style.cssText = `
      position: fixed; 
      top: -${window.scrollY}px;
      overflow-y: scroll;
      width: 100%;`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = '';
      window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
    };
  }, []);

  return (
    <>
      <div className="popup">
        <div className="popup__content">
          <p className="title">헤드라인</p>
          <div className="input__wrapper">
            <input type="text" className="input__headline" placeholder="검색하실 헤드라인을 입력해주세요." />
          </div>
        </div>
        <div className="popup__content">
          <p className="title">날짜</p>
          <div className="input__wrapper calendar">
            <input type="text" className="input__date" placeholder="날짜를 선택해주세요." />
            <img className="calendar-image inactive" />
          </div>
        </div>
        <div className="popup__content">
          <p className="title">국가</p>
          <div className="nations">
            <button className="btn__nation inactive">대한민국</button>
            <button className="btn__nation active">중국</button>
            <button className="btn__nation inactive">일본</button>
            <button className="btn__nation active">미국</button>
            <button className="btn__nation inactive">북한</button>
            <button className="btn__nation active">러시아</button>
            <button className="btn__nation inactive">프랑스</button>
            <button className="btn__nation active">영국</button>
          </div>
        </div>
        <button className="btn__filter">필터 적용하기</button>
      </div>
      <div className="dimmed" onClick={handleClickDimmed} />
    </>
  );
}
