import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";

import AuthHandler from "./components/AuthHandler";
import AuthenticatedApp from "./authenticated";
import { isAuthenticated } from "./utils";
import NonAuthenticatedApp from "./nonAuthenticated";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(isAuthenticated());
  }, []);

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
