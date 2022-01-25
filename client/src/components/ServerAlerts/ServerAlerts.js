import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

// setAppState((prev) => {
//   return { ...prev, auth: res.data.auth };
// });

export default function ServerAlerts(props) {
  //const [open, setOpen] = React.useState(false);
  //const open =

  // const handleClick = () => {
  //   setOpen(true);
  // };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      // setOpen(false); // if you want to have it close by clicking anywhere
      return;
    }

    //setOpen(false);
    props.setAppState((prev) => {
      return {
        ...prev,
        snackBar: { isShown: false, severity: null, message: null },
      };
    });
  };
  //("server alerts renders");
  // console.log(props.appState);

  // if (props.appState.snackBar.isShown === true) {
  //   setOpen(true);
  // }

  if (props.appState.snackBar.severity && props.appState.snackBar.isShown) {
    return (
      <Stack spacing={2} sx={{ width: "100%" }}>
        {/* <Button variant="outlined" onClick={() => handleClick()}>
        Open success snackbar
      </Button> */}
        <Snackbar
          open={props.appState.snackBar.isShown}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <Alert
            onClose={handleClose}
            severity={props.appState.snackBar.severity}
            sx={{ width: "100%" }}
          >
            {props.appState.snackBar.message}
          </Alert>
          {/* <Alert severity="error">This is an error message!</Alert>
      <Alert severity="warning">This is a warning message!</Alert>
      <Alert severity="info">This is an information message!</Alert>
      <Alert severity="success">This is a success message!</Alert> */}
        </Snackbar>
      </Stack>
    );
  } else {
    return <></>;
  }
}
