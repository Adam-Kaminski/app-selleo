import React from "react";
import NavBar from "../components/NavBar";
import { Switch, Route } from "react-router-dom";
import Bundle from "../components/Bundle";
import Calendar from "../components/Calendar";
import Settings from "../components/Settings";

const Dashboard = ({ handleLogin }) => {
  const username = localStorage.getItem("username");

  return (
    <>
      <NavBar handleLogin={handleLogin} />
      <div className="wrapper">
        <h2>Witaj, {username}</h2>
        <Switch>
          <Route path="/dashboard/bundle">
            <Bundle />
          </Route>
          <Route path="/dashboard/calendar">
            <Calendar />
          </Route>
          <Route path="/dashboard/settings">
            <Settings />
          </Route>
        </Switch>
      </div>
    </>
  );
};

export default Dashboard;
