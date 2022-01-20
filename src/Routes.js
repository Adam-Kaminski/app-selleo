import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import { useAuth0 } from '@auth0/auth0-react';
import Loading from './components/Loading';

const Routes = () => {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) return <Loading />;

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
