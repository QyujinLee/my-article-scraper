import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import useSectionType from '../hooks/useSectionType';

export default function Footer() {
  const navigate = useNavigate();
  const { value: sectionType, setSectionType } = useSectionType();

  /**
   * 섹션 탭 클릭 시 이벤트
   */
  const handleSection = useCallback((e: React.MouseEvent) => {
    const value: string | undefined = (e.currentTarget as HTMLDivElement).dataset.section;
    setSectionType(value);
    navigate(`/${value}`);
  }, []);

  return (
    <div className="navbar">
      <div
        className={`navbar__button ${sectionType === 'home' ? 'active' : 'inactive'}`}
        data-section="home"
        onClick={handleSection}
      >
        <img className="home-image" />
        <div className="button__desc">홈</div>
      </div>
      <div
        className={`navbar__button ${sectionType === 'scrap' ? 'active' : 'inactive'}`}
        data-section="scrap"
        onClick={handleSection}
      >
        <img className="scrap-image" />
        <div className="button__desc">스크랩</div>
      </div>
    </div>
  );
}
