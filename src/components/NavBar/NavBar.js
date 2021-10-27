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
      <Box className="nav-container">
        <Link to="/">
          <img src="/assets/img/selleo_worklog.png" alt="selleo logo" className="logo" />
        </Link>
        <BottomNavigation showLabels>
          <Link to="/dashboard/calendar">
            <BottomNavigationAction label="kalendarz" showLabel icon={<CalendarTodayIcon />} />
          </Link>
          <Link to="/dashboard/bundles">
            <BottomNavigationAction icon={<PlaylistAddCheckIcon />} label="bundle" showLabel />
          </Link>
          <Link to="/dashboard/settings">
            <BottomNavigationAction icon={<SettingsIcon />} label="ustawienia" showLabel />
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
