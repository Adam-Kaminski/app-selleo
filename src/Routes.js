import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./components/Login";
import { Redirect } from "react-router";
import Dashboard from "./pages/Dashboard";
import Test1 from "./pages/Test1";

const Routes = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("username1")
  );

  return (
    <Router>
      <Route exact path="/dashboard">
        {!isLoggedIn ? <Redirect to="/" /> : <Dashboard />}
      </Route>
      <Route exact path="/">
        {isLoggedIn ? (
          <Redirect to="/dashboard" />
        ) : (
          <Login handleLogin={setIsLoggedIn} />
        )}
      </Route>
      <Route path={'/test'}>
          <Test1 />
      </Route>
    </Router>
  );
};

export default Routes;
