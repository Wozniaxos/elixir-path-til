import React from "react";
import AdminPanel from "./AdminPanel";
import MainRoutes from "../components/MainRoutes";
import SideBar from "../components/SideBar";
import AddPost from "../authenticated/AddPost";
import EditPost from "../authenticated/EditPost";
import { Switch, Route } from "react-router-dom";

const AuthenticatedApp = ({ setIsLoggedIn }) => {
  return (
    <>
      <AdminPanel setIsLoggedIn={setIsLoggedIn} />
      <SideBar />
      <MainRoutes />
      {/* authenticated user routes */}
      <Switch>
        <Route exact path="/add-post">
          <AddPost />
        </Route>
        <Route path="/edit-post/:id">
          <EditPost />
        </Route>
      </Switch>
    </>
  );
};

export default AuthenticatedApp;
