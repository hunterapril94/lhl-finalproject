//this file is throwing console errors --KM
import React from "react";
import axios from "axios";
import { Grid, Button, Box, Typography, Avatar, Chip } from "@mui/material";
import { useOutletContext } from "react-router";
import Paper from "@mui/material/Paper";
import CheckIcon from "@mui/icons-material/Check";
import { styled } from "@mui/material/styles";
import EditProfile from "../../components/Modals/EditProfile";
import { useEffect, useState } from "react";

axios.defaults.withCredentials = true;

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function UserDetail() {
  const [appState, setAppState] = useOutletContext();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  console.log(appState);
  const user = appState.profile;

  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`, //throwing an error in console
    };
  }

  function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.substr(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  const updateUserInfo = (e) => {
    // console.log(userInfo);

    const data = new FormData(e.currentTarget);

    let lender = data.get("lender");
    let borrower = data.get("borrower");

    console.log(lender);

    const object1 = {
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      email: data.get("email"),
      phone: data.get("phone"),
      neighborhood: data.get("neighborhood"),
      address: data.get("address"),

      lender: true,
      borrower: true,
    };
    console.log(object1);
    axios
      .post(`http://localhost:8001/api/users/edit`, object1)
      .then((res) => {
        console.log(res.data);
        setAppState((prev) => {
          return {
            ...prev,
            auth: true,
            profile: res.data.userProfile,
            snackBar: {
              isShown: res.data.isShown,
              severity: res.data.severity,
              message: res.data.message,
            },
          };
        });
        setOpen(false);
      })
      .catch((err) => {
        console.log(err);
      });
    //  navigate("/my-products");
  };
  return (
    <>
      <Typography variant="h4" sx={{ mt: 2 }}>
        Profile
      </Typography>
      <Grid></Grid>
      <Box
        sx={{
          textAlign: "center",
          backgroundColor: "white",
          p: 3,
          m: "auto",
          width: "400px",
        }}
      >
        <Avatar
          alt="Remy Sharp"
          {...stringAvatar(`${user.first_name} ${user.last_name}`)}
          sx={{ m: "auto", mb: 2, width: 200, height: 200, fontSize: 60 }}
        />
        <Typography variant="h4">{`${user.first_name} ${user.last_name}`}</Typography>
        <Typography variant="body1"> {user.email}</Typography>
        <Typography variant="body1"> {user.phone}</Typography>
        <Typography>From {user.neighborhood}</Typography>
        <Typography>Address: {user.address}</Typography>
        <Box sx={{ m: 3 }}>
          {user.lender ? (
            <Chip
              label="Lender"
              color="success"
              variant="outlined"
              icon={<CheckIcon />}
            ></Chip>
          ) : (
            <Chip label="Lender" />
          )}{" "}
          {user.borrower ? (
            <Chip
              label="Borrower"
              color="success"
              variant="outlined"
              icon={<CheckIcon />}
            ></Chip>
          ) : (
            <Chip label="Borrower" />
          )}
        </Box>
        <Button sx={{ textAlign: "right" }} onClick={handleOpen}>
          Edit profile
        </Button>
        <EditProfile
          handleSubmit={updateUserInfo}
          handleClose={handleClose}
          open={open}
          user={user}
        ></EditProfile>
      </Box>
    </>
  );
}
export default UserDetail;
