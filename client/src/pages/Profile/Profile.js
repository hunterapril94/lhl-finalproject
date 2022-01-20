import { useEffect, useState } from "react";
import axios from "axios";
import {
  Grid,
  Typography,
  ListItem,
  List,
  styled,
  Divider,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { Link, useParams } from "react-router-dom";
import theme from "../../components/styles";
import PageviewIcon from "@mui/icons-material/Pageview";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import InfoIcon from "@mui/icons-material/Info";

function UserDetail() {
  const { id } = useParams;
  const [user, setUser] = useState({});
  useEffect(() => {
    axios.get(`http://localhost:8001/api/users/info`).then((user) => {
      setUser(user);
    });
  }, []);
  const Demo = styled("div")(({ theme }) => ({
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.tertiary.main,
  }));
  return (
    <Grid container direction="column">
      <Grid item xs={12} md={6}>
        <Grid color={theme.palette.primary.main}>
          <h1>Profile</h1>
        </Grid>
        <Demo>
          <List>
            <Link to="/profile/view">
              <ListItem>
                <Grid color={theme.palette.primary.main}>
                  <PageviewIcon />
                  View
                </Grid>
              </ListItem>
            </Link>
            <Divider />
            <Link to="/profile/edit">
              <ListItem>
                <Grid color={theme.palette.primary.main}>
                  <EditIcon />
                  Edit
                </Grid>
              </ListItem>
            </Link>
            <Divider />
            <Link to="/profile/pending-requests">
              <ListItem>
                <Grid color={theme.palette.primary.main}>
                  <PendingActionsIcon />
                  Pending Requests
                </Grid>
              </ListItem>
            </Link>
            <Divider />
            <Link to="/profile/myproducts">
              <ListItem>
                <Grid color={theme.palette.primary.main}>
                  <Inventory2Icon />
                  My Products
                </Grid>
              </ListItem>
            </Link>
            <Divider />
            <Link to="/profile/myproducts/:id">
              <ListItem>
                <Grid color={theme.palette.primary.main}>
                  <InfoIcon />
                  Product Detail
                </Grid>
              </ListItem>
            </Link>
            <Divider />
            <Link to="/profile/myproducts/:id/edit">
              <ListItem color={theme.palette.tertiary.main}>
                <Grid color={theme.palette.primary.main}>
                  <EditIcon />
                  Product Edit
                </Grid>
              </ListItem>
            </Link>
          </List>
        </Demo>
      </Grid>
      <p> {user.name}</p>
      <p>{user.email}</p>
    </Grid>
  );
}
export default UserDetail;
