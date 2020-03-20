import React from "react";
import AdminPanel from "./AdminPanel";
import MainRoutes from "../components/MainRoutes";
import SideBar from "../components/SideBar";

const AuthenticatedApp = ({ setIsLoggedIn }) => {
  return (
    <>
      <AdminPanel setIsLoggedIn={setIsLoggedIn} />
      <SideBar />
      <MainRoutes />
    </>
  );
};

export default AuthenticatedApp;
