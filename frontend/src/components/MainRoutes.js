import React from "react";
import { Switch, Route } from "react-router-dom";
import RandomPost from "../components/RandomPost";
import Stats from "../components/Stats";
import Posts from "../components/Posts";

const MainRoutes = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Posts />
      </Route>
      <Route path="/random-post">
        <RandomPost />
      </Route>
      <Route path="/stats">
        <Stats />
      </Route>
    </Switch>
  );
};

export default MainRoutes;
