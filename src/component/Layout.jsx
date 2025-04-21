import React from "react";
import Header from "./Header";
import useWindowSize from "../Hooks/useWindowSize";
import { Outlet } from "react-router-dom";
import Footer from "../Footer";

const Layout = () => {
  const { width } = useWindowSize();
  return (
    <div className="h-full flex flex-col">
      {width <= 730 ? null : <Header />}
      <main>
        <Outlet />
      </main>
      {width <= 730 ? <Footer /> : null}
    </div>
  );
};

export default Layout;
