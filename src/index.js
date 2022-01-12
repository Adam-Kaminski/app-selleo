import React from 'react';
import ReactDOM from 'react-dom';
import { StyledEngineProvider } from '@mui/material/styles';
import { SnackbarProvider } from 'notistack';
import './index.scss';
import Routes from './Routes';
import Auth0Provider from './Auth0Provider';
import ApolloSetup from './ApolloSetup';

ReactDOM.render(
  <StyledEngineProvider injectFirst>
    <React.StrictMode>
      <Auth0Provider>
        <ApolloSetup>
          <SnackbarProvider maxSnack={4}>
            <Routes />
          </SnackbarProvider>
        </ApolloSetup>
      </Auth0Provider>
    </React.StrictMode>
  </StyledEngineProvider>,
  document.getElementById('root')
);
