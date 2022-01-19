import { useState } from "react";
import axios from "axios";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Button, Grid, InputLabel } from '@mui/material';
import theme from "../components/styles";

axios.defaults.withCredentials = true;

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useOutletContext();
  const navigate = useNavigate();
  const submitHandler = (event) => {
    event.preventDefault();

    axios
      .post(`http://localhost:8001/api/users/login`, {
        email: email,
        password: password,
      })
      .then((res) => {
        if (res.data.auth) {
          setAuth(true);
          navigate("/");
        } else {
          setAuth(false);
        }
      });
  };
  return (
    <Grid color={theme.palette.primary.main} container direction='column'>
      <h1>Login</h1>
      <form autoComplete="off" onSubmit={submitHandler}>
      <InputLabel>Email</InputLabel>
      <input
        className=""
        name="email"
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <InputLabel>Password</InputLabel>
      <input
        className=""
        name="password"
        type="text"
        placeholder="Enter password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <Grid margin='10px 10px 10px 0px'  item><Button variant='contained' type="submit">Submit</Button></Grid>
      </form>
    </Grid>

  );
}

export default Login;
