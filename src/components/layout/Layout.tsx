import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../Footer';
import Header from '../Header';
import SearchPopup from '../SearchPopup';

export default function Layout() {
  return (
    <div>
      {/* <SearchPopup /> */}
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
