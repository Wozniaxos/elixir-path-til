import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./App.css";
import AuthHandler from "./components/AuthHandler";
import AuthenticatedApp from "./authenticated";
import { isAuthenticated } from "./utils";
import NonAuthenticatedApp from "./nonAuthenticated";
import {
  saveAllCategories,
  saveCurrentUser,
  saveAllUsers,
  saveAllPosts
} from "./store/actions/actions";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoggedIn(isAuthenticated());
    dispatch(saveAllPosts());
    dispatch(saveCurrentUser());
    dispatch(saveAllCategories());
    dispatch(saveAllUsers());
  }, [dispatch]);

  const renderApp = isLoggedIn ? (
    <AuthenticatedApp setIsLoggedIn={setIsLoggedIn} />
  ) : (
    <NonAuthenticatedApp />
  );

  return (
    <Router>
      {renderApp}
      <Route path="/auth">
        <AuthHandler setIsLoggedIn={setIsLoggedIn} />
      </Route>
    </Router>
  );
}

export default App;
