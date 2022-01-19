import theme from './styles';
import {Card, CardMedia, CardContent, Grid, Rating}  from '@mui/material';
import { Link } from 'react-router-dom';
function Product(props) {
  return (
    
    <div className="product">
      <Grid container>
        <Card sx={{ maxWidth: 300 }}>
          <Grid
            backgroundColor={theme.palette.secondary.dark}
            color={theme.palette.tertiary.main}
            container
            height={550}
            >
            <div>
              <CardMedia
                component="img"
                image={props.image}
                height="100%"
                width="100%"
                alt={props.name}
                />
            </div>        
            <CardContent >
              <p>{props.name}</p>
              <p>Category: {props.category}</p>
              <p>Price: ${props.price/100}</p>
              <p>Deposit Amount: ${props.deposit_amount/100}</p>
              {/* <h3>Description: {props.description}</h3> */}
              <Rating name="read-only" value={props.stars} readOnly />
            </CardContent>
          </Grid>
        </Card>
      </Grid>     
    </div>
  );
}
export default Product;
