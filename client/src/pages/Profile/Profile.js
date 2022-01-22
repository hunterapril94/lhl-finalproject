//this file is throwing console errors --KM

import { useEffect, useState } from "react";
import axios from "axios";
import {
  Grid,
  Table,
  TableBody,
  TableRow,
  TableCell,
  CardMedia,
  CardContent,
  Button,
  Box,
  Typography,
  TableHead,
} from "@mui/material";
import { useOutletContext } from "react-router";
import EditIcon from "@mui/icons-material/Edit";
import theme from "../../components/styles";




axios.defaults.withCredentials = true;

function dayParser(startDay, endDate) {
  return Math.floor((Date.parse(endDate) - Date.parse(startDay)) / 86400000);
}

function UserDetail() {
  const [user, setUser] = useState({});
  const [borrowed, setBorrowed] = useState([]);
  const [lent, setLent] = useState([]);
  const [currentLent, setCurrentLent] = useState([]);
  const [currentBorrowed, setCurrentBorrowed] = useState([]);
  const [appState, setAppState] = useOutletContext();
  const [showHideLent, setShowHideLent] = useState("none");
  const [showHideBorrowed, setShowHideBorrowed] = useState("none");
  const [showHideCurrentLent, setShowHideCurrentLent] = useState("none");
  const [showHideCurrentBorrowed, setShowHideCurrentBorrowed] =
    useState("none");
  const allStates = () => {
    const promise1 = axios.get(`http://localhost:8001/api/users/profile`);
    const promise2 = axios.get(`http://localhost:8001/api/requests/pending`);
    const promise3 = axios.get(`http://localhost:8001/api/users/my-lent-products`);
    const promise4 = axios.get(`http://localhost:8001/api/users/my-borrowed-products`);
    return (
      Promise.all([promise1, promise2, promise3, promise4]).then(
        (res) => {
          setUser(res[0].data.userProfile);
          setBorrowed(res[1].data.pendingOutgoingBorrowRequests);
          setLent(res[1].data.pendingIncommingLendRequests);
          setCurrentBorrowed(res[3].data.myBorrowedProducts);
          setCurrentLent(res[2].data.myLentProducts);
          console.log(currentLent)
        }
      )
    )
  }
  
  useEffect(() => { allStates() }, []);
  function handleClickLent(event) {
    event.preventDefault();
    if (showHideLent === "none") {
      setShowHideLent("block");
    } else {
      setShowHideLent("none");
    }
  }

  function handleClickBorrowed(event) {
    event.preventDefault();
    if (showHideBorrowed === "none") {
      setShowHideBorrowed("block");
    } else {
      setShowHideBorrowed("none");
    }
  }

  function handleClickCurrentBorrowed(event) {
    event.preventDefault();
    if (showHideCurrentBorrowed === "none") {
      setShowHideCurrentBorrowed("block");
    } else {
      setShowHideCurrentBorrowed("none");
    }
  }

  function handleClickCurrentLent(event) {
    event.preventDefault();
    var div = document.getElementById("borrowed");
    if (showHideCurrentLent === "none") {
      setShowHideCurrentLent("block");
    } else {
      setShowHideCurrentLent("none");
    }
  }
  const acceptSubmit = (event, id, price) => {
    event.preventDefault();
    console.log(id)
    axios
      .post(
        `http://localhost:8001/api/requests/incomming/${id}/activate`
      ).then( (res) => {
        setAppState((prev) => {
          const updatedProfile = {
            ...prev.profile,
            cash_balance_cents: user.cash_balance_cents + price*100
          };
          return { ...prev, cart: [], profile: updatedProfile };
        })
        allStates()

        user.cash_balance_cents = user.cash_balance_cents + price*100
        })
      .catch((err) => {console.log(err.message)})}

      function returnSubmit(event, id) {
        event.preventDefault();
        console.log(id)
        // axios
        // .post(
        //   `http://localhost:8001/api/requests/incomming/${id}/returned`
        // ).then(()=>{
        //   allStates()
        // })
      }
  
  return (
    <Grid color={theme.palette.primary.main}>
      <h1>User Profile</h1>
      <Box display="flex" direction="row" container>
        <Grid backgroundColor="white" color={theme.palette.primary.main} xs={3} item>
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
          backgroundColor={theme.palette.secondary.main}
          display="flex"
          direction="column"
          container
          >
          <Box component="form" onSubmit={handleClickLent}>
            <Typography
              color={theme.palette.primary.main}
              fontSize="20pt"
              marginTop="20px"
              marginLeft="10px"
              fontWeight='normal'
              >
              Pending Lending Approval
            </Typography>
            <h2>
              <Button
                variant="contained"
                sx={{
                  borderRadius: "50%",
                  marginLeft: "10px",
                  marginRight: "20px",
                }}
                type="submit"
                >
                {lent.length}
              </Button>
            </h2>
          </Box>
          <Grid display={showHideLent} backgroundColor={theme.palette.tertiary.main}>
            <Table sx={{ minWidth: 550 }} aria-label="simple table" id="lent" >
              <TableHead>
                <TableRow>
                  <TableCell>Item</TableCell>
                  <TableCell align="center">Contact</TableCell>
                  <TableCell align="center">cost per day</TableCell>
                  <TableCell align="center">days requested</TableCell>
                  <TableCell align="center">total revenue</TableCell>
                  <TableCell align="center"></TableCell>
                  <TableCell align="center"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {lent.map((request) => (
                  <TableRow
                    key={request.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {request.name}
                    </TableCell>
                    <TableCell align="center">
                      {request.requester_email}
                    </TableCell>
                    <TableCell align="center">
                      ${request.price_per_day_cents / 100}
                    </TableCell>
                    <TableCell align="center">
                      {dayParser(request.start_time, request.end_time)}
                    </TableCell>
                    <TableCell align="center">
                      $
                      {(dayParser(request.start_time, request.end_time) *
                      request.price_per_day_cents) /
                      100}
                    </TableCell>
                    <TableCell>
                      <Box
                        component='form'
                        onSubmit={(event)=>{acceptSubmit(event, request.products_transactions_id, (dayParser(request.start_time, request.end_time) *
                        request.price_per_day_cents) /100)}}>
                        <Grid display="flex">
                          <Button
                            variant="contained"
                            sx={{ marginRight: "20px" }}
                            type='submit'
                            >
                            Accept
                          </Button>
                          <Button variant="contained">Reject</Button>
                        </Grid>
                      </Box>
                       
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Grid>
          <Box component="form" onSubmit={handleClickBorrowed}>
            <Typography
              variant="h2"
              color={theme.palette.primary.main}
              fontSize="20pt"
              marginTop="20px"
              marginLeft="10px"
            >
              Pending approval to borrow
            </Typography>
            <h2>
              <Button
                variant="contained"
                sx={{
                  borderRadius: "50%",
                  marginLeft: "10px",
                  marginRight: "40px",
                }}
                type="submit"
              >
                {borrowed.length}
              </Button>
            </h2>
            <Grid display={showHideBorrowed} backgroundColor={theme.palette.tertiary.main}>
              <Table
                sx={{ minWidth: 550, display: { showHideBorrowed } }}
                aria-label="simple table"
                id="borrow" 
              >
                <TableHead>
                  <TableRow>
                    <TableCell>Item</TableCell>
                    <TableCell align="center">Contact</TableCell>
                    <TableCell align="center">cost per day</TableCell>
                    <TableCell align="center">days requested</TableCell>
                    <TableCell align="center">total revenue</TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {borrowed.map((request) => (
                    <TableRow
                      key={request.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {request.name}
                      </TableCell>
                      <TableCell align="center">
                        {request.owner_email}
                      </TableCell>

                      <TableCell align="center">
                        {request.price_per_day_cents / 100} $
                      </TableCell>
                      <TableCell align="center">
                        {dayParser(request.start_time, request.end_time)}
                      </TableCell>
                      <TableCell align="center">
                        ${(dayParser(request.start_time, request.end_time) *
                          request.price_per_day_cents) /
                          100}
                        
                      </TableCell>
                      <TableCell align="center">
                        <Button>Cancel</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Grid>
          </Box>
          <Grid display='flex' direction='column' container>
            <Grid
              color={theme.palette.primary.main}
              backgroundColor={theme.palette.secondary.main}
              xs={9}
              item
            >
              <Box component="form" onSubmit={handleClickCurrentLent}>
                <Typography
                  color={theme.palette.primary.main}
                  fontSize="20pt"
                  marginTop="20px"
                  marginLeft="10px"
                >
                  Currently Lent{" "}
                </Typography>
                <h2>
                  <Button
                    variant="contained"
                    sx={{
                    borderRadius: "50%",
                    marginLeft: "10px",
                    marginRight: "20px",
                    }}
                    type="submit"
                  >
                    {currentLent.length}
                  </Button>
                </h2>
              </Box>
              <Grid display={showHideCurrentLent} backgroundColor={theme.palette.tertiary.main}>
                <Table sx={{ minWidth: 550 }} aria-label="simple table" id="lent">
                  <TableHead>
                    <TableRow>
                      <TableCell>Item</TableCell>
                      <TableCell align="center">Contact</TableCell>
                      <TableCell align="center"></TableCell>
                      <TableCell align="center">days requested</TableCell>
                      <TableCell align="center">Mark Returned</TableCell>
                      <TableCell align="center"></TableCell>
                      <TableCell align="center"></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {currentLent.map((request) => (
                    <TableRow
                      key={request.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {request.name}
                      </TableCell>
                      <TableCell align="center">
                        {request.borrower_email}
                      </TableCell>

                      <TableCell align="center"></TableCell>
                      <TableCell align="center">
                        {dayParser(request.start_time, request.end_time)}
                      </TableCell>
                      <TableCell align="center">
                        <Box component='form' onSubmit={(event)=>{returnSubmit(event, request.products_transactions_id)}}>
                          <Button variant="contained">Returned</Button>
                        </Box>
                      </TableCell>
                    </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Grid>


            <Box component="form" onSubmit={handleClickCurrentBorrowed}>
              <Typography
                color={theme.palette.primary.main}
                fontSize="20pt"
                marginTop="20px"
                marginLeft="10px"
                >
                Currently Borrowed
              </Typography>
              <h2>
                <Button
                  variant="contained"
                  sx={{
                    borderRadius: "50%",
                    marginLeft: "10px",
                    marginRight: "20px",
                  }}
                  type="submit"
                >
                  {currentBorrowed.length}
                </Button>
              </h2>
            </Box>
            <Grid display={showHideCurrentBorrowed} backgroundColor={theme.palette.tertiary.main}>
              <Table
                sx={{ minWidth: 550, display: { showHideCurrentBorrowed } }}
                aria-label="simple table"
                id="borrow"
              >
                <TableHead>
                  <TableRow>
                    <TableCell>Item</TableCell>
                    <TableCell align="center">Contact</TableCell>
                    <TableCell align="center">cost per day</TableCell>
                    <TableCell align="center">days requested</TableCell>
                    <TableCell align="center">total revenue</TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {currentBorrowed.map((request) => (
                    <TableRow
                    key={request.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {request.name}
                      </TableCell>
                      <TableCell align="center">
                        {request.owner_email}
                      </TableCell>

                      <TableCell align="center">
                        ${request.price_per_day_cents / 100}
                      </TableCell>
                      <TableCell align="center">
                        {dayParser(request.start_time, request.end_time)}
                      </TableCell>
                      <TableCell align="center">
                        $
                        {(dayParser(request.start_time, request.end_time) *
                          request.price_per_day_cents) /
                          100}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Grid>
            </Grid>

            <Typography
              color={theme.palette.primary.main}
              fontSize="20pt"
              marginTop="20px"
              marginLeft="10px"
            >
              Balance: ${user.cash_balance_cents/100}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Grid>
  );
}
export default UserDetail;
