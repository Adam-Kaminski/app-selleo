import "./App.css";
import React from "react";
import Routes from "./Routes";
import Entries from "./components/Entries";
import NewEntry from "./components/NewEntry";
// import {Entries} from "./components/Entries";

function App() {
  return (
    <div>
      <Routes />
      <NewEntry />
      <Entries />
    </div>
  );
}

export default App;
