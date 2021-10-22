import React from "react";
import logo from "../logo.png";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import OutlinedInput from "@mui/material/OutlinedInput";
import { useState } from "react";

const Login = ({ handleLogin }) => {
  const [username, setUsername] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("username", username);
    console.log("login");
    handleLogin(username);
  };

  return (
    <div className="login-box">
      <img className="logo" src={logo} />
      <Box
        onSubmit={handleSubmit}
        component="form"
        noValidate
        autoComplete="off"
      >
        <FormControl sx={{ width: "25ch" }}>
          <OutlinedInput
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            placeholder="Nazwa użytkownika"
          />
          <Button
            sx={{ marginTop: "10px" }}
            type="submit"
            variant="contained"
            color="primary"
            disabled={!username}
          >
            Loguj
          </Button>
        </FormControl>
      </Box>
    </div>
  );
};

export default Login;
