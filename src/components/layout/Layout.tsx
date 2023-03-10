import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import usePopupType from '../../hooks/usePopupType';
import useScrapedIds from '../../hooks/useScrapedIds';
import useSectionType from '../../hooks/useSectionType';
import Footer from '../Footer';
import Header from '../Header';
import SearchPopup from '../SearchPopup';

export default function Layout() {
  const { isShowFilter } = usePopupType();
  const location = useLocation();
  const { value: sectionType, setSectionType } = useSectionType();
  const { scrapedIds, setScrapedIds } = useScrapedIds();
  const [isBlank, setIsBlank] = useState<boolean>(false);

  // 새로고침 시 location을 바탕으로 sectionType set
  useEffect(() => {
    if (location.pathname === '/scrap') {
      setSectionType('scrap');
    } else {
      setSectionType('home');
    }
  }, [sectionType, location]);

  useEffect(() => {
    // localStorage에 저장된 ids를 전역변수로 초기화
    const ids: string | null = localStorage.getItem('ids');

    if (ids) {
      setScrapedIds(JSON.parse(ids));
    } else {
      setIsBlank(true);
    }
  }, []);

  useEffect(() => {
    if (scrapedIds.length > 0) {
      setIsBlank(false);
    } else {
      setIsBlank(true);
    }
  }, [sectionType]);

  return (
    <div>
      {isShowFilter && <SearchPopup />}
      {!(sectionType === 'scrap' && isBlank) && <Header />}
      <Outlet />
      <Footer />
    </div>
  );
}
