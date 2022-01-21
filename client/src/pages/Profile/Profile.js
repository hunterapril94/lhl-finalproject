import { useEffect, useState } from "react";
import axios from "axios";
import {
  Grid,
  Table,
  TableBody,
  TableRow,
  TableCell,
  styled,
  Divider,
  Card,
  CardMedia,
  CardContent,
  Button,
  CardHeader,
  Box,
  Typography
} from "@mui/material";
import { useNavigate, useOutletContext } from "react-router";
import EditIcon from "@mui/icons-material/Edit";
import { Link, useParams } from "react-router-dom";
import theme from "../../components/styles";
import PageviewIcon from "@mui/icons-material/Pageview";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import InfoIcon from "@mui/icons-material/Info";

axios.defaults.withCredentials = true;

function UserDetail() {
  const { id } = useParams;
  const [user, setUser] = useState({});
  const [borrowed, setBorrowed] = useState([]);
  const [lent, setLent] = useState([])
  const [appState, setAppState] = useOutletContext();
  useEffect(() => {
    const promise1 = axios.get(`http://localhost:8001/api/users/profile`)
    const promise2 = axios.get(`http://localhost:8001/api/requests/pending`)
    // const promise3 = axios.get(`http://localhost:8001/api/users/my-lent-products`)
    // const promise4 = axios.get(`http://localhost:8001/api/users/balance`)
    Promise.all([promise1, promise2])
    .then((res) => {
      console.log(res[0].data)
      console.log(res[1].data)
      // console.log(res[2].data)
      setUser(res[0].data.userProfile);
      setBorrowed(res[1].data.pendingOutgoingBorrowRequests)
      setLent(res[1].data.pendingIncommingLendRequests)
    });
  }, []);
  return (
    <Grid color={theme.palette.primary.main}>
        <h1>User Profile</h1>
        <Box display='flex' direction='row'>
        <Grid backgroundColor="white" color={theme.palette.primary.main} xs={3}>
            <CardMedia 
            component='img'
            image='https://www.pngitem.com/pimgs/m/294-2947257_interface-icons-user-avatar-profile-user-avatar-png.png'

            />
            <CardContent>
              <h2>{user.first_name} {user.last_name}</h2>
              <h2>{user.email}</h2>
              <h2>Neighborhood:</h2>
              <h2>{user.neighborhood}</h2>
              <h2>Phone: {user.phone}</h2>
              <h2>Borrower: {user.borrower ? "yes" : "no"}</h2>
              <h2>Lender: {user.lender ? "yes" : "no"}</h2>
              <Grid marginLeft='70%' container><Button variant='contained'><EditIcon /></Button></Grid>
            </CardContent>
          </Grid>
          <Grid color={theme.palette.primary.main} backgroundColor={theme.palette.secondary.main} xs={9} display='flex'>
            <Typography variant='h2' color={theme.palette.primary.main} fontSize='20pt' marginTop='20px' marginLeft='10px'>Borrowed Items </Typography><h2><Button variant='contained' sx={{borderRadius: '50%', marginLeft: '10px', marginRight: '40px'}}>{borrowed.length}</Button></h2>
            <Typography color={theme.palette.primary.main} fontSize='20pt' marginTop='20px'>Lent Items </Typography><h2><Button variant='contained' sx={{borderRadius: '50%', marginLeft: '10px', marginRight: '20px'}}>{lent.length}</Button></h2>
          </Grid>



        </Box>
          
    </Grid>
  );
}
export default UserDetail;
