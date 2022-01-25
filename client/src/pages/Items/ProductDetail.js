import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Order from "../../components/Modals/Order";
import CreateItem from "../../components/Modals/CreateItem";

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
// import theme from "../../components/styles";
import ReviewsList from "../../components/Reviews/ReviewsList";
import { useNavigate, useOutletContext } from "react-router";

axios.defaults.withCredentials = true;

const ProductDetail = () => {
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
        return {
          ...prev,
          auth: res.data.auth,
          snackBar: {
            isShown: res.data.isShown,
            severity: res.data.severity,
            message: res.data.message,
          },
        };
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

  const updateItem = (itemInfo) => {
    const object1 = {
      category: itemInfo.category,
      name: itemInfo.name,
      price_per_day_cents: Number(itemInfo.price) * 100,
      description: itemInfo.description,
      deposit_amount_cents: Number(itemInfo.deposit) * 100,
      image: itemInfo.imageUrl,
      id: itemInfo.id,
    };
    axios
      .post(`http://localhost:8001/api/products/${object1.id}/edit`, object1)
      .then((res) => {
        //  console.log(res);
      })
      .catch((err) => {
        // console.log(err);
      });
    // navigate("/my-products");
  };

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
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              Item Description
              {product.user_id === appState.profile.id && (
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <Button onClick={handleOpen}>Edit</Button>
                  <CreateItem
                    handleSubmit={updateItem}
                    handleClose={handleClose}
                    open={open}
                    product={product}
                  ></CreateItem>
                  <Button sx={{ color: "red" }}>Delete</Button>
                </Box>
              )}
            </Typography>
            <Typography variant="h6" color="text.secondary">
              {description}
            </Typography>
          </CardContent>
          <CardActions>
            <Grid
              ml={0.5}
              container
              direction="row"
              justifyContent="space-between"
              flexWrap="wrap-reverse"
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexDirection: "column",
                  width: 300,
                }}
              >
                <Typography ml={1} mt={2} mb={2} variant="h5">
                  Cost Estimation
                </Typography>
                <Typography ml={1} mb={2} variant="h6" color="text.secondary">
                  Per-Day: ${price_per_day_cents / 100} | Week: $
                  {(price_per_day_cents / 100) * 7}
                </Typography>
                <Typography ml={1} mb={2} variant="h6" color="text.secondary">
                  Deposit: ${deposit_amount_cents / 100}
                </Typography>

                <Box ml={1} mb={5}>
                  {product.user_id != appState.profile.id ? (
                    <Order
                      handleSubmit={handleSubmit}
                      handleOpen={handleOpen}
                      handleClose={handleClose}
                      open={open}
                    />
                  ) : (
                    <></>
                  )}
                </Box>
              </Box>
              <ReviewsList productId={id} mb={1.5} />
            </Grid>
          </CardActions>
        </Card>
      </Grid>
    </Fade>
  );
};

export default ProductDetail;
