import logo from "../logo.png";
import FormControl, { useFormControl } from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import OutlinedInput from "@mui/material/OutlinedInput";
import { useState } from "react";

const Login = () => {
  const [username, setUsername] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  console.log(username);

  return (
    <>
      <img className="logo" src={logo} />
      <Box component="form" noValidate autoComplete="off">
        <form onSubmit={handleSubmit}>
          <FormControl sx={{ width: "25ch" }}>
            <OutlinedInput
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Nazwa użytkownika"
            />
            <Button
              sx={{ marginTop: "10px" }}
              type="submit"
              variant="contained"
              color="primary"
            >
              Loguj
            </Button>
          </FormControl>
        </form>
      </Box>
    </>
  );
};

export default Login;
