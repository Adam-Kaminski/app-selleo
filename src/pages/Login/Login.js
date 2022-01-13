import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useAuth0 } from '@auth0/auth0-react';

const Login = () => {
  const { loginWithRedirect } = useAuth0();

  const handleSubmit = () => {
    loginWithRedirect({
      audience: 'graphql-api',
      scope: 'read',
    });
  };

  return (
    <div className="login-box">
      <img className="logo" src="/assets/img/logo.png" />
      <Box onSubmit={handleSubmit} component="form" noValidate autoComplete="off">
        <FormControl sx={{ width: '25ch' }}>
          <Button sx={{ marginTop: '10px' }} type="submit" variant="contained" color="primary">
            Loguj
          </Button>
        </FormControl>
      </Box>
    </div>
  );
};

export default Login;
