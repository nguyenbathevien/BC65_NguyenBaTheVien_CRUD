import React from "react";
import { Outlet } from "react-router-dom";
import HeaderHome from "../components/HeaderHome";

const HomeTemplate = () => {
  return (
    <>
      <HeaderHome />
      <div className="content" style={{ minHeight: 650 }}>
        <Outlet />
      </div>
      <footer className="fs-1 bg-dark text-white text-center p-3">
        Footer
      </footer>
    </>
  );
};

export default HomeTemplate;
