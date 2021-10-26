import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from '@apollo/client';
import { StyledEngineProvider } from '@mui/material/styles';
import App from './App';
import { getNewClient } from './api';
import './index.css';

const username = localStorage.getItem('username');

const client = getNewClient(username);

ReactDOM.render(
  <StyledEngineProvider injectFirst>
    <React.StrictMode>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </React.StrictMode>
  </StyledEngineProvider>,
  document.getElementById('root')
);
