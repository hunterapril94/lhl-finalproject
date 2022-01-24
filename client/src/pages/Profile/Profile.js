//this file is throwing console errors --KM
import axios from "axios";
import {
  Grid,
  CardMedia,
  CardContent,
  Button,
  Box,
  Typography,
} from "@mui/material";
import { useOutletContext } from "react-router";
import EditIcon from "@mui/icons-material/Edit";
import theme from "../../components/styles";
import { Link } from "react-router-dom";

axios.defaults.withCredentials = true;


function UserDetail() {

  const [appState, setAppState] = useOutletContext();
  console.log(appState)
  const user = appState.profile

  return (
    <Grid color={theme.palette.primary.main}>
      <h1>User Profile</h1>
      <Box display="flex" direction="row" container>
        <Grid
          backgroundColor="white"
          color={theme.palette.primary.main}
          xs={3}
          item
        >
          <CardMedia
            component="img"
            image="https://www.pngitem.com/pimgs/m/294-2947257_interface-icons-user-avatar-profile-user-avatar-png.png"
          />
          <CardContent>
            <p>
              {user.first_name} {user.last_name}
            </p>
            <p>{user.email}</p>
            <p>Neighborhood:</p>
            <p>{user.neighborhood}</p>
            <p>Phone: {user.phone}</p>
            <p>Borrower: {user.borrower ? "yes" : "no"}</p>
            <p>Lender: {user.lender ? "yes" : "no"}</p>
            <Grid marginLeft="70%" container>
              <Button variant="contained">
                <EditIcon />
              </Button>
            </Grid>
          </CardContent>
        </Grid>
        <Grid
          color={theme.palette.primary.main}
          backgroundColor='white'
          display="flex"
          direction="column"
          container
        >
            <Typography
              color={theme.palette.primary.main}
              fontSize="20pt"
              marginTop="20px"
              marginLeft="10px"
              fontWeight="normal"
            >
              <Link to='/my-requests'><Button variant='contained'>Pending Transactions</Button></Link>
            </Typography>
          <Grid display="flex" direction="column" container>
            <Grid
              color={theme.palette.primary.main}
              backgroundColor='white'
              xs={9}
              item
            >
                <Typography
                  color={theme.palette.primary.main}
                  fontSize="20pt"
                  marginTop="20px"
                  marginLeft="10px"
                >
                  <Link to='/my-lent-items'><Button variant='contained'>Currently Lent</Button></Link>
                </Typography>
                <Typography
                  color={theme.palette.primary.main}
                  fontSize="20pt"
                  marginTop="20px"
                  marginLeft="10px"
                >
                  <Link to='/my-borrowed'><Button variant='contained'>Currently Borrowed</Button></Link>
                </Typography>
                <Typography
                  color={theme.palette.primary.main}
                  fontSize="20pt"
                  marginTop="20px"
                  marginLeft="10px"
                >
                  <Link to='/my-completed-transactions'><Button variant='contained'>Transaction History</Button></Link>
                </Typography>
            </Grid>

            <Typography
              color={theme.palette.primary.main}
              fontSize="20pt"
              marginTop="20px"
              marginLeft="10px"
            >
              Balance: ${user.cash_balance_cents / 100}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Grid>
  );
}
export default UserDetail;
