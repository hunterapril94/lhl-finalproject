import Product from "./Product"
import { Grid } from "@mui/material"
import theme from "./styles";

export default function Products(props) {

  const products = props.products.map((product)=> {
    return(    <Grid color={theme.palette.primary.main} backgroundColor={theme.palette.tertiary.main} item m={3}><Product key={product.id} name={product.name} 
      category={product.category}
      price={product.price_per_day_cents}
      deposit_amount={product.deposit_amount_cents}
      description={product.description}
      image={product.image}
      /></Grid> )

  })
  Array.isArray(products)
  return(  
    <Grid color={theme.palette.primary.main} backgroundColor={theme.palette.tertiary.main} container direction="column" >
    <div className="products" >
        <h1>Products</h1>
        <Grid container direction="row" spacing={0}>
          {props.products.length > 1 ? products : <Product key={4000} name="No Products Available" />}
        </Grid>
      </div>
    </Grid>  

  

  )
}