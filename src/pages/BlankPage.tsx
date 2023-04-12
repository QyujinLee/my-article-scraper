import React from 'react';
import { useNavigate } from 'react-router-dom';

type blankPageProps = {
  isNoScraped: boolean;
};

export default function BlankPage({ isNoScraped }: blankPageProps) {
  const navigate = useNavigate();
  const handleClickHome = () => {
    navigate('/');
  };
  return (
    <div className="blank__main">
      <div className="blank__wrapper">
        <div className="blank__img--wrapper">
          <img className="blank__img" src="/src/assets/images/img_blank_page.png" alt="빈 페이지" />
        </div>
        <p className="blank__message">
          {isNoScraped ? '저장된 스크랩이 없습니다.' : '검색조건과 일치하는 결과가 없습니다.'}
        </p>
        {isNoScraped && (
          <button className="btn__home" onClick={handleClickHome}>
            스크랩 하러 가기
          </button>
        )}
      </div>
    </div>
  );
}
