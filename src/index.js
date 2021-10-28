import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from '@apollo/client';
import { StyledEngineProvider } from '@mui/material/styles';
import { SnackbarProvider } from 'notistack';
import App from './App';
import { getNewClient } from './api';
import './index.css';

const username = localStorage.getItem('username');

const client = getNewClient(username);
// wyciągnięte do function componentu
// useState
// useMemo
// context

ReactDOM.render(
  <StyledEngineProvider injectFirst>
    <React.StrictMode>
      <ApolloProvider client={client}>
        <SnackbarProvider maxSnack={4}>
          <App />
        </SnackbarProvider>
      </ApolloProvider>
    </React.StrictMode>
  </StyledEngineProvider>,
  document.getElementById('root')
);
