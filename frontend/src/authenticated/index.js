import React from "react";
import { Switch, Route } from "react-router-dom";
import AddPost from "../authenticated/AddPost";
import AdminPanel from "./AdminPanel";
import EditPost from "../authenticated/EditPost";
import MainRoutes from "../components/MainRoutes";
import SideBar from "../components/SideBar";
import UserProfile from "../authenticated/UserProfile";
import ReviewPost from "./ReviewPost";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AuthenticatedApp = () => {
  return (
    <>
      <ToastContainer />
      <AdminPanel />
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
        <Route path="/review-posts">
          <ReviewPost />
        </Route>
      </Switch>
    </>
  );
};

export default AuthenticatedApp;
