import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from '@apollo/client';
import { StyledEngineProvider } from '@mui/material/styles';
import { SnackbarProvider } from 'notistack';
import { getNewClient } from './api';
import './index.scss';
import Routes from './Routes';
import Auth0Provider from './Auth0Provider';

const username = localStorage.getItem('username');

const client = getNewClient(username);
// wyciągnięte do function componentu
// useState
// useMemo
// context

ReactDOM.render(
  <StyledEngineProvider injectFirst>
    <React.StrictMode>
      <Auth0Provider>
        <ApolloProvider client={client}>
          <SnackbarProvider maxSnack={4}>
            <Routes />
          </SnackbarProvider>
        </ApolloProvider>
      </Auth0Provider>
    </React.StrictMode>
  </StyledEngineProvider>,
  document.getElementById('root')
);
