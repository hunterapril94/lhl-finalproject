import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Fade, Box } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useNavigate } from "react-router";
import Reviews from "../Reviews/ReviewsList";
import { Grid } from "@mui/material";
import ReviewsList from "../Reviews/ReviewsList";
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
          <Card sx={{ width: 345, height: 360 }}>
            <CardMedia
              component="img"
              alt="green iguana"
              height="205.44"
              width="307"
              image={props.image}
            />
            <Box sx={{ margin: "auto" }}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {props.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {props.description}
                </Typography>
              </CardContent>
            </Box>
            <Button
              size="small"
              sx={{
                textDecoration: "none",
                float: "bottom",
                float: "bottom",
                marginLeft: 1.5,
              }}
              // component={RouterLink}
              // to={props.link}
            >
              Learn More
            </Button>
          </Card>
        </Grid>
        <ReviewsList />
      </div>
    </Fade>
  );
}
export default Product;
