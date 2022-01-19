import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {Card, CardMedia, CardContent, Grid}  from '@mui/material';
import theme from "../components/styles";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  useEffect(() => {
    axios.get(`http://localhost:8001/api/products/${id}`).then((res) => {
      console.log(product);
      setProduct(res.data.product);
    });
  }, []);
  const {
    image,
    name,
    category,
    deposit_amount_cents,
    description,
    price_per_day_cents,
  } = product;
  return (
    <div className="product">
    <Grid color={theme.palette.primary.main} container direction="column" alignItems={'center'}>
    <h1>{name}</h1>
      <Card  sx={{ maxWidth:600, height: 900}}>
    <Grid  backgroundColor={theme.palette.secondary.dark} container> 
        <div>
          <CardMedia component="img" image={image} width="300" alt={name} />
        </div>          
        <CardContent>
        <Grid backgroundColor={theme.palette.secondary.dark} color={theme.palette.tertiary.main} container height={550} direction="column">
          <p>Category: {category}</p>
          <p>Price: ${price_per_day_cents/100}</p>
          <p>Deposit Amount: ${deposit_amount_cents/100}</p>
          <p>Description: {description}</p>
        </Grid>
        </CardContent>
    </Grid>
      </Card>
    </Grid>

    </div>
  );
};

export default ProductDetail;
