import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { Grid } from "@mui/material";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

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
  const { user } = props;
  const [userInfo, setUserInfo] = useState({
    firstName: user.first_name,
    lastName: user.last_name,
    email: user.email,
    phone: user.phone,
    neighborhood: user.neighborhood,
    address: user.address,
    lender: user.lender,
    borrower: user.borrower,
  });

  const handleOnChange = (e) => {
    const name = e.target.name;

    setUserInfo({
      ...userInfo,
      [name]:
        name === "borrower" || name === "lender"
          ? e.target.checked
          : e.target.value,
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
              onSubmit={(e) => e.preventDefault()}
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
              <Box
                fullWidth
                sx={{
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
                  sx={{ mr: 2 }}
                  required
                  fullWidth
                  value={userInfo.firstName}
                  id="firstName"
                  label="first name"
                  name="firstName"
                  onChange={handleOnChange}
                />
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
              </Box>
              <Box
                fullWidth
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <TextField
                  fullWidth
                  sx={{ mr: 2 }}
                  margin="normal"
                  required
                  id="email"
                  label="Email"
                  name="email"
                  value={userInfo.email}
                  onChange={handleOnChange}
                />
                <TextField
                  fullWidth
                  margin="normal"
                  required
                  type="text"
                  id="phone"
                  label="Phone Number"
                  name="phone"
                  value={userInfo.phone}
                  onChange={handleOnChange}
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
                id="address"
                label="Address"
                name="address"
                value={userInfo.address}
                onChange={handleOnChange}
              />

              <FormGroup
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "row",
                  mb: 2,
                }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      name="lender"
                      checked={userInfo.lender}
                      onChange={handleOnChange}
                    />
                  }
                  label="Borrower"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      name="borrower"
                      checked={userInfo.borrower}
                      onChange={handleOnChange}
                    />
                  }
                  label="Lender"
                />
              </FormGroup>
              {/* <TextField
                margin="normal"
                required
                fullWidth
                id="borrower"
                label="Borrower"
                name="borrower"
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
                value={userInfo.lender}
                onChange={handleOnChange}
              /> */}
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
