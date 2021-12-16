import React from 'react';
import { Switch, Route } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NavBar from '../../components/NavBar';
import Bundles from '../Bundles';
import Bundle from '../Bundle';
import Calendar from '../Calendar';
import Settings from '../Settings';
import Login from '../Login';
import './Dashboard.scss';

const Dashboard = () => {
  return (
    <>
      <NavBar />
      <div className="main wrapper">
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/bundles">
            <Bundles />
          </Route>
          <Route path="/bundle/:id">
            <Bundle />
          </Route>
          <Route exact path="/">
            <Calendar />
          </Route>
          <Route path="/settings">
            <Settings />
          </Route>
        </Switch>
      </div>
    </>
  );
};

export default Dashboard;
