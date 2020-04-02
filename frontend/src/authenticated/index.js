import React from "react";
import { Switch, Route } from "react-router-dom";
import AddPost from "../authenticated/AddPost";
import AdminPanel from "./AdminPanel";
import EditPost from "../authenticated/EditPost";
import MainRoutes from "../components/MainRoutes";
import SideBar from "../components/SideBar";
import UserProfile from "../authenticated/UserProfile";

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
        <Route path="/profile">
          <UserProfile />
        </Route>
      </Switch>
    </>
  );
};

export default AuthenticatedApp;
