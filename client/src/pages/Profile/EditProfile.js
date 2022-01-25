import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { Grid } from "@mui/material";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";

import InputAdornment from "@mui/material/InputAdornment";
import { useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function EditProfile(props) {
  // console.log(props.product);

  const [userInfo, setUserInfo] = useState({
    firstName: props.first_name,
    lastName: props.last_name,
    email: props.email,
    phone: props.phone,
    neighborhood: props.neighborhood,
    lender: props.lender,
    borrower: props.borrower,
  });
  const handleOnChange = (e) => {
    const name = e.target.name;
    setUserInfo({
      ...userInfo,
      [name]: e.target.value,
    });
  };
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={props.open}
        onClose={props.handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.open}>
          <Grid>
            <Box
              component="form"
              margin="auto"
              sx={style}
              onSubmit={props.handleSubmit}
            >
              <Typography
                id="transition-modal-title"
                variant="h4"
                component="h2"
                sx={{ mb: 2, textAlign: "center" }}
              >
                Edit profile
              </Typography>
              <TextField
                margin="normal"
                required
                fullWidth
                value={userInfo.name}
                id="FirstName"
                label="first name"
                name="firstName"
                onChange={handleOnChange}
              />
              <Box
                sx={{
                  width: 1,
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  value={userInfo.lastName}
                  onChange={handleOnChange}
                />

                <TextField
                  margin="normal"
                  sx={{ ml: 2, mr: 2 }}
                  required
                  id="email"
                  label="Email"
                  name="email"
                  value={userInfo.email}
                  onChange={handleOnChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  }}
                />
                <TextField
                  margin="normal"
                  required
                  type="text"
                  id="phone"
                  label="Phone Number"
                  name="phone"
                  value={userInfo.phone}
                  onChange={handleOnChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  }}
                />
              </Box>
              <TextField
                margin="normal"
                required
                fullWidth
                id="neighborhood"
                label="Neighborhood"
                name="neighborhood"
                value={userInfo.neighborhood}
                onChange={handleOnChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="borrower"
                label="Borrower"
                name="borrower"
                multiline
                rows="6"
                value={userInfo.borrower}
                onChange={handleOnChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="lender"
                label="Lender"
                name="lender"
                multiline
                rows="6"
                value={userInfo.lender}
                onChange={handleOnChange}
              />
              <Button
                type="submit"
                fullWidth
                size="large"
                variant="contained"
                color="secondary"
                sx={{ marginTop: "10px" }}
                onClick={(e) => {
                  // e.preventDefault();
                  props.handleSubmit(userInfo);
                }}
              >
                Update
              </Button>
            </Box>
          </Grid>
        </Fade>
      </Modal>
    </div>
  );
}
