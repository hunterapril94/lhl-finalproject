// import { useState } from "react";
// import axios from "axios";
// import { useNavigate, useOutletContext } from "react-router-dom";

// axios.defaults.withCredentials = true;

// function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [auth, setAuth] = useOutletContext();
//   const navigate = useNavigate();
//   const submitHandler = (event) => {
//     event.preventDefault();

//     axios
//       .post(`http://localhost:8001/api/users/login`, {
//         email: email,
//         password: password,
//       })
//       .then((res) => {
//         if (res.data.auth) {
//           setAuth(true);
//           navigate("/");
//         } else {
//           setAuth(false);
//         }
//       });
//   };
//   return (
//     <form autoComplete="off" onSubmit={submitHandler}>
//       <input
//         className=""
//         name="email"
//         type="email"
//         placeholder="Enter email"
//         value={email}
//         onChange={(event) => setEmail(event.target.value)}
//       />
//       <input
//         className=""
//         name="password"
//         type="text"
//         placeholder="Enter password"
//         value={password}
//         onChange={(event) => setPassword(event.target.value)}
//       />
//       <button>Submit</button>
//     </form>
//   );
// }

// export default Login;

import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import axios from "axios";
import { useNavigate, useOutletContext } from "react-router-dom";

axios.defaults.withCredentials = true;

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="#">
        AKA coders
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function LogIn() {
  const [appState, setAppState] = useOutletContext();
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    axios
      .post(`http://localhost:8001/api/users/login`, {
        email: data.get("email"),
        password: data.get("password"),
      })
      .then((res) => {
        console.log(res)
        if (res.data.auth) {
          setAppState((prev)=>{
            return {...prev, auth: true}
          });
          navigate("/");
        } else {
          setAppState((prev)=>{
            return {...prev, auth: false}
          })
        }
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ height: "100%" }}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                {/* <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid> */}
                <Grid item xs={12} style={{ textAlign: "center" }}>
                  <Link href="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </Box>
    </ThemeProvider>
  );
}
