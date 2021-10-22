import React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import logo from "../logo.png";
import { Link } from "react-router-dom";
import { Box } from "@mui/system";
import LogoutIcon from "@mui/icons-material/Logout";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import SettingsIcon from "@mui/icons-material/Settings";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";

const NavBar = ({ handleLogin }) => {
  const logOut = () => {
    localStorage.setItem("username", "");
    handleLogin("");
  };

  return (
    <>
      <Box className="nav-container">
        <Link to="/">
          <img src={logo} alt="selleo logo" className="logo" />
        </Link>
        <BottomNavigation showLabels>
          <Link to="/dashboard/calendar">
            <BottomNavigationAction
              label="kalendarz"
              showLabel
              icon={<CalendarTodayIcon />}
            />
          </Link>
          <Link to="/dashboard/bundle">
            <BottomNavigationAction
              icon={<PlaylistAddCheckIcon />}
              label="bundle"
              showLabel
            />
          </Link>
          <Link to="/dashboard/settings">
            <BottomNavigationAction
              icon={<SettingsIcon />}
              label="ustawienia"
              showLabel
            />
          </Link>
          <BottomNavigationAction
            onClick={logOut}
            className="nav-logout"
            label="wyloguj"
            icon={<LogoutIcon />}
            showLabel
          />
        </BottomNavigation>
      </Box>
    </>
  );
};

export default NavBar;
