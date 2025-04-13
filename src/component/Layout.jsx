import React from "react";
import Header from "./Header";
import useWindowSize from "../Hooks/useWindowSize";
import { Outlet } from "react-router-dom";
import Footer from "../Footer";
import SnderChat from "../ChatApp/SnderChat";
import { Suspense } from "react";
import Spinner from "../Spinner";

const Layout = () => {
  const { width, height } = useWindowSize();

  return (
    <div className="h-full flex flex-col">
      {width <= 730 ? null : <Header />}

      <main>

<Suspense fallback={<Spinner/>}>
  <Outlet />
</Suspense>
     
      </main>
      <SnderChat /> 
      {width <= 730 ? <Footer /> : null}
    </div>
  );
};

export default Layout;
