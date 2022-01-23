import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Order from "../../components/Modals/Order";
import {
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
  Typography,
  CardActions,
  CardHeader,
  Grid,
  Rating,
  Box,
  Fade,
  Button,
  Stack,
  TextField,
  ThemeProvider,
} from "@mui/material";
import theme from "../../components/styles";
import ReviewsList from "../../components/Reviews/ReviewsList";
import { useNavigate, useOutletContext } from "react-router";

axios.defaults.withCredentials = true;

const ProductDetail = () => {
  const [value, setValue] = useState(2);
  const [appState, setAppState] = useOutletContext();
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  useEffect(() => {
    axios.get(`http://localhost:8001/api/products/${id}`).then((res) => {
      setProduct(res.data.product);
      setAppState((prev) => {
        return { ...prev, auth: res.data.auth };
      });
      setIsLoading(false);
    });
  }, []);
  const {
    image,
    name,
    category,
    deposit_amount_cents,
    description,
    price_per_day_cents,
    avg_stars,
  } = product;

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    if (!appState.auth) {
      navigate("/login");
    } else {
      appState.cart.push({
        product: product,
        start_date: data.get("start"),
        end_date: data.get("end"),
      });
      navigate("/");
    }
  };
  // return (
  //   <ThemeProvider theme={theme}>
  //     <Fade in={true} timeout={1500}>
  //       <div className="product">
  //         <Grid
  //           color={theme.palette.primary.main}
  //           container
  //           direction="column"
  //           alignItems={"center"}
  //         >
  //           <h1>{name}</h1>
  //           <Card sx={{ maxWidth: 600, height: 1050 }}>
  //             <Grid backgroundColor={theme.palette.secondary.dark} container>
  //               <div>
  //                 <CardMedia
  //                   component="img"
  //                   image={image}
  //                   width="300"
  //                   alt={name}
  //                 />
  //               </div>
  //               <CardContent>
  //                 <Grid
  //                   backgroundColor={theme.palette.secondary.dark}
  //                   color={theme.palette.tertiary.main}
  //                   container
  //                   height={550}
  //                   direction="column"
  //                 >
  //                   <p>Category: {category}</p>
  //                   <p>Price: ${price_per_day_cents / 100}</p>
  //                   <p>Deposit Amount: ${deposit_amount_cents / 100}</p>
  //                   <p>Description: {description}</p>

  //                   <Box
  //                     component="form"
  //                     onSubmit={handleSubmit}
  //                     sx={{ display: "flex" }}
  //                     color={theme.palette.tertiary.main}
  //                     flexDirection="column"
  //                   >
  //                     <Rating
  //                       name="read-only"
  //                       value={Number(avg_stars)}
  //                       readOnly
  //                     />
  //                     <TextField
  //                       required
  //                       id="start"
  //                       name="start"
  //                       label="Start Date"
  //                       type="date"
  //                       sx={{ width: 220, marginTop: "10px" }}
  //                       InputLabelProps={{
  //                         shrink: true,
  //                       }}
  //                     />
  //                     <TextField
  //                       required
  //                       id="end"
  //                       name="end"
  //                       label="End Date"
  //                       type="date"
  //                       sx={{ width: 220, marginTop: "10px" }}
  //                       InputLabelProps={{
  //                         shrink: true,
  //                       }}
  //                     />
  //                     <Button
  //                       type="submit"
  //                       fullWidth
  //                       variant="contained"
  //                       sx={{ marginTop: "10px" }}
  //                     >
  //                       Request Item
  //                     </Button>
  //                   </Box>
  //                 </Grid>
  //               </CardContent>
  //             </Grid>
  //           </Card>
  //         </Grid>
  //         <Grid>
  //           <ReviewsList productId={id} />
  //         </Grid>
  //       </div>
  //     </Fade>
  //   </ThemeProvider>
  // );
  console.log("here");
  console.log(avg_stars);
  console.log(avg_stars);
  return isLoading ? (
    <div />
  ) : (
    <Fade in={true} timeout={1500}>
      <Grid justifyContent="center">
        <Card sx={{ maxWidth: 900, margin: "auto" }}>
          <CardHeader
            // avatar={

            // }

            action={
              <Box
                sx={{
                  height: 50,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Rating name="rating" value={Number(avg_stars)} readOnly />
              </Box>
            }
            title={name}
            subheader={`Category: ${category}`}
          />

          <CardMedia component="img" image={image} alt="" />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Item Description
            </Typography>
            <Typography variant="h6" color="text.secondary">
              {description}
            </Typography>
          </CardContent>

          <CardActions>
            <Order
              handleSubmit={handleSubmit}
              handleOpen={handleOpen}
              handleClose={handleClose}
              open={open}
            />
            {/* <Button size="large" color="primary" variant="contained">
              Book Now!
            </Button> */}
          </CardActions>
        </Card>
      </Grid>
    </Fade>
  );
};

export default ProductDetail;
