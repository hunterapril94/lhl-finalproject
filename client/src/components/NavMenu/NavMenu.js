import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { navMenuItems } from "./constants/navMenuItems";
import { useNavigate } from "react-router-dom";
import theme from "../styles";
import { Grid } from "@mui/material";
import { Link } from "react-router-dom";
import Cart from "../CustomBadges/Cart";
import axios from "axios";
import { useEffect } from "react";

// import theme from "../styles";
const drawerWidth = 240;

// the code for mini drawer start
// the code for mini drawer

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),

  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function NavMenu(props) {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  const auth = props.auth;

  useEffect(() => {
    axios
      .get("http://localhost:8001/api/users/profile")
      .then((res) => {
        //  console.log(res.data);
        props.setAppState((prev) => {
          return {
            ...prev,
            auth: res.data.auth,
            profile: res.data.userProfile,
          };
        });
      })
      .catch((err) => console.log(err.message));
  }, []);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  //console.log("user");
  //console.log(props.appState.profile);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} style={{ background: "#2E3B55" }}>
        <Grid
          backgroundColor={theme.palette.primary.main}
          container
          direction="row"
          justifyContent="space-between"
          sx={{ height: 75 }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer "
              onClick={handleDrawerOpen}
              edge="start"
              size="large"
              sx={{ mr: 5, ...(open && { display: "none" }) }}
            >
              <MenuIcon />
            </IconButton>
            {/* <Typography variant="h6" noWrap component="div"> */}
            <Link to="/">
              {" "}
              <img
                src="../logo/logo_white.png"
                alt="Next Door Lenders logo"
                height="60"
              />
            </Link>
            {/* </Typography> */}
          </Toolbar>

          <Grid
            color="white"
            margin="10px 20px"
            display={"flex"}
            sx={{ alignItems: "center" }}
          >
            {props.appState.auth && (
              <Box margin="10px">
                <Typography>
                  Balance: ${props.appState.profile.cash_balance_cents / 100}
                </Typography>
              </Box>
            )}
            <Link to="/cart">
              <Cart count={props.appState.cart.length} />
            </Link>
          </Grid>
        </Grid>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
          color: "#d5d6d8",
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {navMenuItems(auth).map((item, index) => (
            <ListItem
              button
              key={item.id}
              onClick={() => {
                navigate(item.route);
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItem>
          ))}
        </List>
        {/* <Divider />
        <List>
          {["All mail", "Trash", "Spam"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List> */}
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        {props.children}
      </Main>
    </Box>
  );
}
