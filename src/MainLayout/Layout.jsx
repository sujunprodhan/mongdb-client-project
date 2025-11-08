import React from 'react';
import Navebar from '../Componets/Navebar';
import { Outlet } from 'react-router';
import Footer from '../Componets/Footer';

const Layout = () => {
  return (
    <div>
      <Navebar></Navebar>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default Layout;