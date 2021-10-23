import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import { ApolloProvider } from "@apollo/client";
import getNewClient from "./api";

const username = localStorage.getItem("username");

const client = getNewClient(username);

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
    ,
  </React.StrictMode>,
  document.getElementById("root")
);
