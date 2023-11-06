import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import Header from "./header-footer/Header";
import Footer from "./header-footer/Footer";

const FrontLayout = () => {
  return (
    <Fragment>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </Fragment>
  );
};

export default FrontLayout;
