import React from "react";
import MainRoutes from "../components/MainRoutes";
import SideBar from "../components/SideBar";

const NonAuthenticatedApp = () => {
  return (
    <>
      <SideBar />
      <MainRoutes />
    </>
  );
};

export default NonAuthenticatedApp;
