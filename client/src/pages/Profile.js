import { useEffect, useState } from "react";
import axios from "axios";
import { Grid, Typography, ListItem, List, ListItemText, styled } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import theme from "../components/styles";


function UserDetail() {
  const { id } = useParams;
  const [user, setUser] = useState({});
  useEffect(() => {
    axios.get(`http://localhost:8001/api/users/info`).then((user) => {
      setUser(user);
    });
  }, []);
  const Demo = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.tertiary.main,
    color: theme.palette.tertiary.main
  }));
  return (
    <Grid container direction='column'>
      <Grid item xs={12} md={6}>
          <Grid color= {theme.palette.primary.main}>
            <h1>Profile</h1>
          </Grid>
          <Demo>
            <List>
              <Link to="/profile/view">
                <ListItem>
                <Grid>View</Grid>
                </ListItem>
              </Link>
              <Link to="/profile/edit">
                <ListItem>

                  Edit
                </ListItem>
              </Link>
              <Link to="/profile/pending-requests">
                <ListItem>
                  pending requests
                </ListItem>
              </Link>
              <Link to="/profile/myproducts">
                <ListItem>
                  my products
                </ListItem>
              </Link>
              <Link to="/profile/myproducts/:id">
                <ListItem>
                  product detail
                </ListItem>
              </Link>
              <Link to="/profile/myproducts/:id/edit">
                <ListItem color={theme.palette.tertiary.main}>
                  product edit
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
