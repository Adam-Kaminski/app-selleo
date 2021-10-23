import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";
import { StyledEngineProvider } from '@mui/material/styles';
import "./index.css";

const client = new ApolloClient({
  uri: "https://worklog-on-steroids.herokuapp.com/api/ql_open",
  cache: new InMemoryCache(),
});



ReactDOM.render(
  <StyledEngineProvider injectFirst>
    <React.StrictMode>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>,
    </React.StrictMode>,
  </StyledEngineProvider>,
  document.getElementById("root")
);
