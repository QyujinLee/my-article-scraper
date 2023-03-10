import React, { useState, useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import usePopupType from '../../hooks/usePopupType';
import useScrapedIds from '../../hooks/useScrapedIds';
import useSectionType from '../../hooks/useSectionType';
import Footer from '../Footer';
import Header from '../Header';
import SearchPopup from '../SearchPopup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Layout() {
  const { isShowFilter } = usePopupType();
  const location = useLocation();
  const { value: sectionType, setSectionType } = useSectionType();
  const { scrapedIds, setScrapedIds } = useScrapedIds();
  const [isBlank, setIsBlank] = useState<boolean>(false);
  const prevIdCntRef = useRef<number>(scrapedIds.length);

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

  useEffect(() => {
    if (prevIdCntRef.current > scrapedIds.length) {
      toast('📜 스크랩이 해제되었습니다.', {
        className: 'my-toast',
        closeButton: false,
        autoClose: 700,
        hideProgressBar: true,
      });
    }

    prevIdCntRef.current = scrapedIds.length;
  }, [scrapedIds]);

  return (
    <div>
      <ToastContainer />
      {isShowFilter && <SearchPopup />}
      {!(sectionType === 'scrap' && isBlank) && <Header />}
      <Outlet />
      <Footer />
    </div>
  );
}
