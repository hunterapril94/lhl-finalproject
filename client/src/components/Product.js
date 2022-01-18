import styles from './styles';
import theme from './styles';
import {Card, CardMedia, CardContent, Grid}  from '@mui/material';
function Product(props) {

      return( 
        <Card  sx={{ width:300 }}>
          <Grid backgroundColor={theme.palette.secondary.dark} color={theme.palette.tertiary.main} container>
          <div className="product">
            <CardMedia className={styles.Media} component="img" image={props.image} height="300" alt={props.name} />
                        
            <CardContent>
              <h2>{props.name}</h2>
              <h3>{props.category}</h3>
              <h3>Price: ${props.price/100}</h3>
              <h3>Deposit Amount: ${props.deposit_amount/100}</h3>
              {/* <h3>Description: {props.description}</h3> */}
            </CardContent>
   

          </div>
          </Grid>
        </Card>
   


    ) 
}
export default Product;