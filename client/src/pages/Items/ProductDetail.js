import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  Card,
  CardMedia,
  CardContent,
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
import { useNavigate, useOutletContext } from "react-router";

axios.defaults.withCredentials = true;

const ProductDetail = () => {
  const [appState, setAppState] = useOutletContext();
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    axios.get(`http://localhost:8001/api/products/${id}`).then((res) => {
      setProduct(res.data.product);
      setAppState((prev) => {
        return { ...prev, auth: res.data.auth };
      });
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
  return (
    <ThemeProvider theme={theme}>
      <Fade in={true} timeout={1500}>
        <div className="product">
          <Grid
            color={theme.palette.primary.main}
            container
            direction="column"
            alignItems={"center"}
          >
            <h1>{name}</h1>
            <Card sx={{ maxWidth: 600, height: 1050 }}>
              <Grid backgroundColor={theme.palette.secondary.dark} container>
                <div>
                  <CardMedia
                    component="img"
                    image={image}
                    width="300"
                    alt={name}
                  />
                </div>
                <CardContent>
                  <Grid
                    backgroundColor={theme.palette.secondary.dark}
                    color={theme.palette.tertiary.main}
                    container
                    height={550}
                    direction="column"
                  >
                    <p>Category: {category}</p>
                    <p>Price: ${price_per_day_cents / 100}</p>
                    <p>Deposit Amount: ${deposit_amount_cents / 100}</p>
                    <p>Description: {description}</p>

                    <Box
                      component="form"
                      onSubmit={handleSubmit}
                      sx={{ display: "flex" }}
                      color={theme.palette.tertiary.main}
                      flexDirection="column"
                    >
                      <Rating
                        name="read-only"
                        value={Number(avg_stars)}
                        readOnly
                      />
                      <TextField
                        required
                        id="start"
                        name="start"
                        label="Start Date"
                        type="date"
                        sx={{ width: 220, marginTop: "10px" }}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                      <TextField
                        required
                        id="end"
                        name="end"
                        label="End Date"
                        type="date"
                        sx={{ width: 220, marginTop: "10px" }}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ marginTop: "10px" }}
                      >
                        Request Item
                      </Button>
                    </Box>
                  </Grid>
                </CardContent>
              </Grid>
            </Card>
          </Grid>
        </div>
      </Fade>
    </ThemeProvider>
  );
};

export default ProductDetail;
