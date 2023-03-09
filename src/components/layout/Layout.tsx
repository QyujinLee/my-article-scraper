import React from 'react';
import { Outlet } from 'react-router-dom';
import usePopupType from '../../hooks/usePopupType';
import Footer from '../Footer';
import Header from '../Header';
import SearchPopup from '../SearchPopup';

export default function Layout() {
  const { isShowFilter } = usePopupType();
  return (
    <div>
      {isShowFilter && <SearchPopup />}
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
