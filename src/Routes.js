import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./components/Login";
import { Redirect } from "react-router";
import Dashboard from "./pages/Dashboard";
import Test1 from "./pages/Test1";

const Routes = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("username")
  );

  return (
    <Router>
      <Route path="/dashboard">
        {!isLoggedIn ? (
          <Redirect to="/" />
        ) : (
          <Dashboard handleLogin={setIsLoggedIn} />
        )}
      </Route>
      <Route exact path="/">
        {isLoggedIn ? (
          <Redirect to="/dashboard/calendar" />
        ) : (
          <Login handleLogin={setIsLoggedIn} />
        )}
      </Route>
      <Route path={"/test"}>
        <Test1 />
      </Route>
    </Router>
  );
};

export default Routes;
