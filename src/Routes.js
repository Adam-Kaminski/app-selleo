import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Redirect } from 'react-router';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Test1 from './pages/Test1';
import { useAuth0 } from '@auth0/auth0-react';

const Routes = () => {
  const { isAuthenticated, user, isLoading } = useAuth0();

  console.log('AAA', isAuthenticated, user);

  if (isLoading) {
    return <span>LOADING...</span>;
  }

  return (
    <Router>
      <Dashboard />
    </Router>
  );
};

export default Routes;
