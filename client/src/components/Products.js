import Product from "./Product"
import { Grid } from "@mui/material"
import theme from "./styles";
import { ThemeProvider } from "@emotion/react";

export default function Products(props) {

  const products = props.products.map((product)=> {
    return( <Grid item m={3}><Product key={product.id} name={product.name} 
      category={product.category}
      price={product.price_per_day_cents}
      deposit_amount={product.deposit_amount_cents}
      description={product.description}
      image={product.image}
      /></Grid> )

  })
  Array.isArray(products)
  return( 
    <ThemeProvider theme={theme}>    
    <div className="products" >

      <Grid color={theme.palette.primary.main} backgroundColor={theme.palette.tertiary.main} container direction="column" alignItems={"center"} >
        <h1>Products</h1>
        <Grid container direction="row" spacing={0}>
          {props.products.length > 1 ? products : <Product key={4000} name="No Products Available" />}
        </Grid>
      </Grid>
      </div>
 
    </ThemeProvider> 
 

  

  )
}
