import theme from "../styles";
import {
  Card,
  CardMedia,
  CardContent,
  Grid,
  Fade,
  // Rating,
  Button,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router";
function Product(props) {
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    navigate(`/products/${props.id}`);
  };
  // const isBorrowedItems = props.isBorrowedItems ? "row" : "column";
  const isMyProducts = props.isMyProducts ? "edit" : "Add to Cart";

  return (
    <Fade in={true} timeout={1500}>
      <div className="product">
        <Grid container>
          <Card sx={{ maxWidth: 300 }}>
            <Grid
              backgroundColor={theme.palette.secondary.dark}
              color={theme.palette.tertiary.main}
              container
              height={550}
            >
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <div>
                  <CardMedia
                    component="img"
                    image={props.image}
                    height="100%"
                    width="100%"
                    alt={props.name}
                  />
                </div>
                <CardContent>
                  <p>{props.name}</p>
                  <p>Category: {props.category}</p>
                  <p>Price: ${props.price / 100}</p>
                  <p>Deposit Amount: ${props.deposit_amount / 100}</p>
                  {/* <h3>Description: {props.description}</h3> */}
                  <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{ display: "flex" }}
                  >
                    <Button type="submit" fullWidth variant="contained">
                      {isMyProducts}
                    </Button>
                  </Box>
                </CardContent>
              </Box>
            </Grid>
          </Card>
        </Grid>
      </div>
    </Fade>
  );
}
export default Product;
