import React from 'react';

export default function Footer() {
  return (
    <div className="navbar">
      <div className="navbar__button active">
        <img className="home-image" />
        <div className="button__desc">홈</div>
      </div>
      <div className="navbar__button inactive">
        <img className="scrap-image" />
        <div className="button__desc">스크랩</div>
      </div>
    </div>
  );
}
