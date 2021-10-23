import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ApolloProvider } from "@apollo/client";
import getNewClient from "./api";
import { StyledEngineProvider } from '@mui/material/styles';
import "./index.css";

const username = localStorage.getItem("username");

const client = getNewClient(username);

ReactDOM.render(
  <StyledEngineProvider injectFirst>
    <React.StrictMode>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </React.StrictMode>
  </StyledEngineProvider>,
  document.getElementById("root")
);
