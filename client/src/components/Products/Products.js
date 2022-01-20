import Product from "./Product";
import { Grid } from "@mui/material";
import theme from "../styles";
import { ThemeProvider } from "@emotion/react";
import { Link } from "react-router-dom";

export default function Products(props) {
  const products = props.products.map((product) => {
    return (
      <Grid key={product.id} m={3}>
        <Link to={`/products/${product.id}`}>
          <Product
            // key={product.id}
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
        >
          <Grid container direction="row" spacing={0}>
            {props.products.length > 1 ? (
              products
            ) : (
              <Product key={4000} name="No Products Available" />
            )}
          </Grid>
        </Grid>
      </div>
    </ThemeProvider>
  );
}