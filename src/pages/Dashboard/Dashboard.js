import React from 'react';
import { Switch, Route } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NavBar from '../../components/NavBar';
import Bundles from '../Bundles';
import Bundle from '../Bundle';
import Calendar from '../Calendar';
import Settings from '../Settings';
import './Dashboard.scss';

const Dashboard = ({ handleLogin }) => {
  const username = localStorage.getItem('username');

  return (
    <>
      <NavBar handleLogin={handleLogin} />
      <div className="main wrapper">
        <Switch>
          <Route path="/dashboard/bundles">
            <Bundles />
          </Route>
          <Route path="/dashboard/bundle/:id">
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
