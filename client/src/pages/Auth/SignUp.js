// we need:
// const user = {
//     first_name: req.body.FirstName,
//     last_name: req.body.LastName,
//     address: req.body.address,
//     neighborhood: req.body.neighborhood,
//     borrower: false, //not sent by axios
//     lender: false, //not sent by axios
//     email: req.body.email,
//     cash_balance_cents: 0, //not sent along  by axios
//     phone: req.body.phone,
//     password: req.body.password,
//   };

// THIS IS STRETCH

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

export default function SignUp() {
  const [appState, setAppState] = useOutletContext();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    axios
      .post(`http://localhost:8001/api/users/signup`, {
        email: data.get("email"),
        password: data.get("password"),
        address: data.get("address"),
        neighborhood: data.get("neighborhood"),
        FirstName: data.get("FirstName"),
        LastName: data.get("LastName"),
        phone: data.get("phone"),
        LastName: data.get("LastName"),
      })
      .then((res) => {
        if (res.data.auth) {
          setAppState(prev => {
            return {...prev, auth: true}
          });
          navigate("/");
        } else {
          setAppState(prev => {
            return {...prev, auth: false}
          });
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
              marginTop: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {/* <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
              <LockOutlinedIcon />
            </Avatar> */}
            <Typography component="h1" variant="h5">
              Sign Up
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                size="small"
                margin="normal"
                required
                fullWidth
                id="FirstName"
                label="First Name"
                name="FirstName"
                autoComplete="text"
                autoFocus
              />
              <TextField
                size="small"
                margin="normal"
                required
                fullWidth
                id="LastName"
                label="Last Name"
                name="LastName"
                autoComplete="text"
                autoFocus
              />
              <TextField
                size="small"
                margin="normal"
                required
                fullWidth
                id="address"
                label="address"
                name="address"
                autoComplete="text"
                autoFocus
              />
              <TextField
                size="small"
                margin="normal"
                required
                fullWidth
                id="neighborhood"
                label="neighborhood"
                name="neighborhood"
                autoComplete="text"
                autoFocus
              />
              <TextField
                size="small"
                margin="normal"
                required
                fullWidth
                id="phone"
                label="phone number"
                name="phone"
                autoComplete="text"
                autoFocus
              />
              <TextField
                size="small"
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
                size="small"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container>
                {/* <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid> */}
                <Grid item xs={12} style={{ textAlign: "center" }}>
                  <Link href="/signin" variant="body2">
                    {"Already have an account? Sign In"}
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
