import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { Link } from 'react-router-dom';
import { Box } from '@mui/system';
import LogoutIcon from '@mui/icons-material/Logout';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import SettingsIcon from '@mui/icons-material/Settings';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import './NavBar.scss';

const NavBar = ({ handleLogin }) => {
  const logOut = () => {
    localStorage.setItem('username', '');
    handleLogin('');
  };

  return (
    <>
      <Box className="header">
        <Link to="/">
          <img className="header__logo" src="/assets/img/logo.png" alt="logo" />
        </Link>

        <BottomNavigation showLabels>
          <div className="logged-user">
            <AccountCircleIcon />
            <h3>{localStorage.getItem('username')}</h3>
          </div>

          <Link to="/dashboard/calendar">
            <BottomNavigationAction
              className="header__nav-item"
              label="kalendarz"
              showLabel
              icon={<CalendarTodayIcon />}
            />
          </Link>
          <Link to="/dashboard/bundles">
            <BottomNavigationAction
              className="header__nav-item"
              icon={<PlaylistAddCheckIcon />}
              label="bundle"
              showLabel
            />
          </Link>
          <Link to="/dashboard/settings">
            <BottomNavigationAction
              className="header__nav-item"
              icon={<SettingsIcon />}
              label="ustawienia"
              showLabel
            />
          </Link>
          <BottomNavigationAction
            className="header__nav-item-logout"
            onClick={logOut}
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
