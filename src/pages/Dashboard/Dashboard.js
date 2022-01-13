import React from 'react';
import { Switch, Route } from 'react-router-dom';
import NavBar from '../../components/NavBar';
import Bundles from '../Bundles';
import Bundle from '../Bundle';
import Calendar from '../Calendar';
import Settings from '../Settings';
import './Dashboard.scss';

const Dashboard = () => {
  return (
    <>
      <NavBar />
      <div className="main wrapper">
        <Switch>
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
