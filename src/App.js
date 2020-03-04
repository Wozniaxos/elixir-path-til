import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import "./App.css";

import AddPost from "./components/AddPost";
import Posts from "./components/Posts";

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li>
              <Link to="/">Posts</Link>
            </li>
            <li>
              <Link to="/add-post">Add post</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/add-post">
            <AddPost />
          </Route>
          <Route path="/">
            <Posts />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
