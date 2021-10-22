import React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import logo from "../logo.png";

import { BrowserRouter as Router, Link } from "react-router-dom";

const NavBar = () => {
  return (
    <>
      <nav>
        <Router>
          <Link to="/">
            <img src={logo} alt="selleo logo" className="logo" />
          </Link>
          <BottomNavigation showLabels>
            <BottomNavigationAction label="kalendarz" />
            <BottomNavigationAction label="bundle" />
            <BottomNavigationAction label="ustawienia" />
          </BottomNavigation>
        </Router>
      </nav>
    </>
  );
};

export default NavBar;
