import React from "react";
import { useState } from "react";
import NavMenu from "./components/NavMenu/NavMenu";
import { Outlet } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import theme from "./components/styles";
import "./App.css";

const App = () => {
  const [auth, setAuth] = useState(false);
  console.log("re renders app");
  return (
    <ThemeProvider theme={theme}>
      <NavMenu auth={auth} setAuth={setAuth}>
        <Outlet context={[auth, setAuth]} />
      </NavMenu>
    </ThemeProvider>
  );
};

export default App;

// import * as React from "react";
// import { styled, useTheme } from "@mui/material/styles";
// import Box from "@mui/material/Box";
// import Drawer from "@mui/material/Drawer";
// import CssBaseline from "@mui/material/CssBaseline";
// import MuiAppBar from "@mui/material/AppBar";
// import Toolbar from "@mui/material/Toolbar";
// import List from "@mui/material/List";
// import Typography from "@mui/material/Typography";
// import Divider from "@mui/material/Divider";
// import IconButton from "@mui/material/IconButton";
// import MenuIcon from "@mui/icons-material/Menu";
// import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
// import ChevronRightIcon from "@mui/icons-material/ChevronRight";
// import ListItem from "@mui/material/ListItem";
// import ListItemIcon from "@mui/material/ListItemIcon";
// import ListItemText from "@mui/material/ListItemText";
// import InboxIcon from "@mui/icons-material/MoveToInbox";
// import MailIcon from "@mui/icons-material/Mail";

// const drawerWidth = 240;

// const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
//   ({ theme, open }) => ({
//     flexGrow: 1,
//     padding: theme.spacing(3),
//     transition: theme.transitions.create("margin", {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.leavingScreen,
//     }),
//     marginLeft: `-${drawerWidth}px`,
//     ...(open && {
//       transition: theme.transitions.create("margin", {
//         easing: theme.transitions.easing.easeOut,
//         duration: theme.transitions.duration.enteringScreen,
//       }),
//       marginLeft: 0,
//     }),
//   })
// );

// const AppBar = styled(MuiAppBar, {
//   shouldForwardProp: (prop) => prop !== "open",
// })(({ theme, open }) => ({
//   transition: theme.transitions.create(["margin", "width"], {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   ...(open && {
//     width: `calc(100% - ${drawerWidth}px)`,
//     marginLeft: `${drawerWidth}px`,
//     transition: theme.transitions.create(["margin", "width"], {
//       easing: theme.transitions.easing.easeOut,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//   }),
// }));

// const DrawerHeader = styled("div")(({ theme }) => ({
//   display: "flex",
//   alignItems: "center",
//   padding: theme.spacing(0, 1),
//   // necessary for content to be below app bar
//   ...theme.mixins.toolbar,
//   justifyContent: "flex-end",
// }));

// export default function PersistentDrawerLeft() {
//   const theme = useTheme();
//   const [open, setOpen] = React.useState(false);

//   const handleDrawerOpen = () => {
//     setOpen(true);
//   };

//   const handleDrawerClose = () => {
//     setOpen(false);
//   };

//   return (
//     <Box sx={{ display: "flex" }}>
//       <CssBaseline />
//       <AppBar position="fixed" open={open}>
//         <Toolbar>
//           <IconButton
//             color="inherit"
//             aria-label="open drawer"
//             onClick={handleDrawerOpen}
//             edge="start"
//             sx={{ mr: 2, ...(open && { display: "none" }) }}
//           >
//             <MenuIcon />
//           </IconButton>
//           <Typography variant="h6" noWrap component="div">
//             Persistent drawer
//           </Typography>
//         </Toolbar>
//       </AppBar>
//       <Drawer
//         sx={{
//           width: drawerWidth,
//           flexShrink: 0,
//           "& .MuiDrawer-paper": {
//             width: drawerWidth,
//             boxSizing: "border-box",
//           },
//         }}
//         variant="persistent"
//         anchor="left"
//         open={open}
//       >
//         <DrawerHeader>
//           <IconButton onClick={handleDrawerClose}>
//             {theme.direction === "ltr" ? (
//               <ChevronLeftIcon />
//             ) : (
//               <ChevronRightIcon />
//             )}
//           </IconButton>
//         </DrawerHeader>
//         <Divider />
//         <List>
//           {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
//             <ListItem button key={text}>
//               <ListItemIcon>
//                 {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
//               </ListItemIcon>
//               <ListItemText primary={text} />
//             </ListItem>
//           ))}
//         </List>
//         <Divider />
//         <List>
//           {["All mail", "Trash", "Spam"].map((text, index) => (
//             <ListItem button key={text}>
//               <ListItemIcon>
//                 {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
//               </ListItemIcon>
//               <ListItemText primary={text} />
//             </ListItem>
//           ))}
//         </List>
//       </Drawer>
//       <Main open={open}>
//         <DrawerHeader />
//         <Typography paragraph>
//           Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
//           eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus
//           dolor purus non enim praesent elementum facilisis leo vel. Risus at
//           ultrices mi tempus imperdiet. Semper risus in hendrerit gravida rutrum
//           quisque non tellus. Convallis convallis tellus id interdum velit
//           laoreet id donec ultrices. Odio morbi quis commodo odio aenean sed
//           adipiscing. Amet nisl suscipit adipiscing bibendum est ultricies
//           integer quis. Cursus euismod quis viverra nibh cras. Metus vulputate
//           eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo
//           quis imperdiet massa tincidunt. Cras tincidunt lobortis feugiat
//           vivamus at augue. At augue eget arcu dictum varius duis at consectetur
//           lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa sapien
//           faucibus et molestie ac.
//         </Typography>
//         <Typography paragraph>
//           Consequat mauris nunc congue nisi vitae suscipit. Fringilla est
//           ullamcorper eget nulla facilisi etiam dignissim diam. Pulvinar
//           elementum integer enim neque volutpat ac tincidunt. Ornare suspendisse
//           sed nisi lacus sed viverra tellus. Purus sit amet volutpat consequat
//           mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis
//           risus sed vulputate odio. Morbi tincidunt ornare massa eget egestas
//           purus viverra accumsan in. In hendrerit gravida rutrum quisque non
//           tellus orci ac. Pellentesque nec nam aliquam sem et tortor. Habitant
//           morbi tristique senectus et. Adipiscing elit duis tristique
//           sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
//           eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
//           posuere sollicitudin aliquam ultrices sagittis orci a.
//         </Typography>
//       </Main>
//     </Box>
//   );
// }

// import "./App.css";
// import axios from "axios";
// import { useEffect, useState } from "react";
// import { Header } from "./components/Header";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { Navigate } from "react-router";

// import Products from "./components/Products";
// import { ThemeProvider } from "@mui/material";
// import theme from "./components/styles";

// import About from "./pages/About";
// import Login from "./pages/Login";
// import Logout from "./pages/Logout";
// import UserDetail from "./pages/Profile";
// import ProductDetail from "./pages/ProductDetail";
// import NotFound from "./pages/NotFound";
// import { useNavigate } from "react-router";
// import ViewProfile from "./pages/ViewProfile";
// import EditProfile from "./pages/EditProfile";
// import PendingRequest from "./pages/PendingRequests";
// import MyProducts from "./pages/MyProducts";
// import MyProductEdit from "./pages/MyProductEdit";
// import MyProductDetail from "./pages/MyProductDetail";

// function App() {
//   const [products, setProducts] = useState([]);
//   const [login, setLogin] = useState(false);

//   useEffect(() => {
//     Promise.all([axios.get("http://localhost:8001/api/products")])
//       .then((all) => {
//         // console.log(res.data.products);
//         setProducts(all[0].data.products);
//         console.log(all[0].data);
//       })
//       .catch((err) => console.log(err.message));
//   }, []);
//   return (
//     <BrowserRouter>
//       <ThemeProvider theme={theme}>
//         <div className="App">
//           <Header auth={login} />

//           <Routes>
//             <Route path="/" element={<Products products={products} />} />
//             <Route
//               path="/products"
//               element={<Products products={products} />}
//             />
//             <Route path="/products/:id" element={<ProductDetail />} />

//             <Route
//               path="/profile"
//               element={login ? <UserDetail /> : <Navigate to="/" />}
//             />
//             <Route path="/profile/view" element={<ViewProfile />} />
//             <Route path="/profile/edit" element={<EditProfile />} />
//             <Route
//               path="/profile/pending-requests"
//               element={<PendingRequest />}
//             />
//             <Route path="/profile/myproducts" element={<MyProducts />} />
//             <Route
//               path="/profile/myproducts/:id"
//               element={<MyProductDetail />}
//             />
//             <Route
//               path="/profile/products/:id/edit"
//               element={<MyProductEdit />}
//             />
//             <Route path="/login" element={<Login auth={setLogin} />} />
//             <Route path="/logout" element={<Login auth={setLogin} />} />
//             <Route path="*" element={<NotFound />} />
//           </Routes>
//         </div>
//       </ThemeProvider>
//     </BrowserRouter>
//   );
// }

// export default App;
