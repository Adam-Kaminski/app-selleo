import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { useAuth0 } from '@auth0/auth0-react';

const Routes = () => {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return (
      <div className="login-box">
        <img className="logo" src="/assets/img/logo.png" />
        <Box sx={{ justifyContent: 'center', display: 'flex', marginTop: '10px' }}>
          <CircularProgress />
        </Box>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Login />;
  }

  return (
    <Router>
      <Dashboard />
    </Router>
  );
};

export default Routes;
