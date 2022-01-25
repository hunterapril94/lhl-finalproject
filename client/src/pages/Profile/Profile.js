//this file is throwing console errors --KM
import axios from "axios";
import {
  Grid,
  CardMedia,
  CardContent,
  Button,
  Box,
  Typography,
  Avatar,
  Chip,
} from "@mui/material";
import { useOutletContext } from "react-router";
import EditIcon from "@mui/icons-material/Edit";
import theme from "../../components/styles";
import { Link } from "react-router-dom";
import Paper from "@mui/material/Paper";
import CheckIcon from "@mui/icons-material/Check";
import { styled } from "@mui/material/styles";

axios.defaults.withCredentials = true;

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function UserDetail() {
  const [appState, setAppState] = useOutletContext();
  //console.log(appState);
  const user = appState.profile;

  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
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
        <Box sx={{ m: 3 }}>
          {user.lender ? (
            <Chip
              label="Lender"
              color="success"
              variant="outlined"
              icon={<CheckIcon />}
            >
              <CheckIcon />
            </Chip>
          ) : (
            <Chip label="Lender" />
          )}{" "}
          {user.borrower ? (
            <Chip
              label="borrower"
              color="success"
              variant="outlined"
              icon={<CheckIcon />}
            >
              <CheckIcon />
            </Chip>
          ) : (
            <Chip label="Borrower" />
          )}
        </Box>
        <Button sx={{ textAlign: "right" }}>Edit profile</Button>
      </Box>
    </>
    // <p>Borrower: {user.borrower ? "yes" : "no"}</p>
    //           <p>Lender: {user.lender ? "yes" : "no"}</p>
    //   <Grid color={theme.palette.primary.main}>
    //     <h1>User Profile</h1>
    //     <Box display="flex" direction="row" container>
    //       <Grid
    //         backgroundColor="white"
    //         color={theme.palette.primary.main}
    //         xs={3}
    //         item
    //       >
    //         <CardMedia
    //           component="img"
    //           image="https://www.pngitem.com/pimgs/m/294-2947257_interface-icons-user-avatar-profile-user-avatar-png.png"
    //         />
    //         <CardContent>
    //           <p>
    //             {user.first_name} {user.last_name}
    //           </p>
    //           <p>{user.email}</p>
    //           <p>Neighborhood:</p>
    //           <p>{user.neighborhood}</p>
    //           <p>Phone: {user.phone}</p>
    //           <p>Borrower: {user.borrower ? "yes" : "no"}</p>
    //           <p>Lender: {user.lender ? "yes" : "no"}</p>
    //           <Grid marginLeft="70%" container>
    //             <Button variant="contained">
    //               <EditIcon />
    //             </Button>
    //           </Grid>
    //         </CardContent>
    //       </Grid>
    //       <Grid
    //         color={theme.palette.primary.main}
    //         backgroundColor='white'
    //         display="flex"
    //         direction="column"
    //         container
    //       >
    //           <Typography
    //             color={theme.palette.primary.main}
    //             fontSize="20pt"
    //             marginTop="20px"
    //             marginLeft="10px"
    //             fontWeight="normal"
    //           >
    //             <Link to='/my-requests'
    //             style={{ textDecoration: "none", color: "white" }}>
    //               <Button variant='contained'>Pending Transactions</Button></Link>
    //           </Typography>
    //         <Grid display="flex" direction="column" container>
    //           <Grid
    //             color={theme.palette.primary.main}
    //             backgroundColor='white'
    //             xs={9}
    //             item
    //           >
    //               <Typography
    //                 color={theme.palette.primary.main}
    //                 fontSize="20pt"
    //                 marginTop="20px"
    //                 marginLeft="10px"
    //               >
    //                 <Link to='/my-lent-items'
    //                 style={{ textDecoration: "none", color: "white" }}><Button variant='contained'>Currently Lent</Button></Link>
    //               </Typography>
    //               <Typography
    //                 color={theme.palette.primary.main}
    //                 fontSize="20pt"
    //                 marginTop="20px"
    //                 marginLeft="10px"
    //               >
    //                 <Link to='/my-borrowed'
    //                 style={{ textDecoration: "none", color: "white" }}><Button variant='contained'>Currently Borrowed</Button></Link>
    //               </Typography>
    //               <Typography
    //                 color={theme.palette.primary.main}
    //                 fontSize="20pt"
    //                 marginTop="20px"
    //                 marginLeft="10px"
    //               >
    //                 <Link to='/my-completed-transactions'
    //                 style={{ textDecoration: "none", color: "white" }}><Button variant='contained'>Transaction History</Button></Link>
    //               </Typography>
    //           </Grid>

    //           <Typography
    //             color={theme.palette.primary.main}
    //             fontSize="20pt"
    //             marginTop="20px"
    //             marginLeft="10px"
    //           >
    //             Balance: ${user.cash_balance_cents / 100}
    //           </Typography>
    //         </Grid>
    //       </Grid>
    //     </Box>
    //   </Grid>
  );
}
export default UserDetail;
