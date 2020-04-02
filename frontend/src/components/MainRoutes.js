import React from "react";
import { Switch, Route } from "react-router-dom";
import RandomPost from "../components/RandomPost";
import Stats from "../components/Stats";
import PostsList from "../components/PostsList";
import DisplayPost from "../components/DisplayPost";
import Categories from "./Categories";
import UserPosts from "./UsersPosts";

const MainRoutes = () => {
  return (
    <Switch>
      <Route exact path="/">
        <PostsList />
      </Route>
      <Route path="/random-post">
        <RandomPost />
      </Route>
      <Route path="/stats">
        <Stats />
      </Route>
      <Route path="/categories">
        <Categories />
      </Route>
      <Route path="/posts/:id">
        <DisplayPost />
      </Route>
      <Route path="/user-posts/:id">
        <UserPosts />
      </Route>
    </Switch>
  );
};

export default MainRoutes;
