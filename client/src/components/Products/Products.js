import Product from "./Product";
import { Grid } from "@mui/material";
import theme from "../styles";
import { ThemeProvider } from "@emotion/react";
import { Link } from "react-router-dom";
import "../../App.css";
import { Typography } from "@mui/material";

export default function Products(props) {
  const products = props.products.map((product) => {
    return (
      <Grid key={product.id} m={3}>
        <Link
          to={`/products/${product.id}`}
          style={{ textDecoration: "none", color: "white" }}
        >
          <Product
            isMyProducts={props.isMyProducts}
            name={product.name}
            category={product.category}
            price={product.price_per_day_cents}
            deposit_amount={product.deposit_amount_cents}
            description={product.description}
            image={product.image}
            stars={Number(product.avg_stars)}
          />
        </Link>
      </Grid>
    );
  });

  return (
    <ThemeProvider theme={theme}>
      <div className="products">
        <Grid
          color={theme.palette.primary.main}
          backgroundColor={theme.palette.tertiary.main}
          container
          direction="column"
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Grid
            container
            direction="row"
            spacing={0}
            alignItems={"center"}
            justifyContent={"center"}
          >
            {props.products.length >= 1 ? (
              products
            ) : (
              <Typography variant="h6" sx={{ textAlign: "Center" }}>
                No Products is matching your search
              </Typography>
            )}
          </Grid>
        </Grid>
      </div>
    </ThemeProvider>
  );
}
