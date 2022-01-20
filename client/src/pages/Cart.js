import { List,ListItem, Grid, Table, TableBody, TableRow, TableCell, Button, Divider, Box } from "@mui/material"
import { useNavigate, useOutletContext } from "react-router";
import DeleteIcon from '@mui/icons-material/Delete';
import theme from "../components/styles";
import axios from "axios";
export default function Cart() {
  const [appState, setAppState] = useOutletContext();
  let subtotal = 0
  let depositSubtotal = 0
  let total = 0;
  const navigate =  useNavigate()
  console.log(appState)
  const handleSubmit = function() {
    const products_transactions = function() {
      const cart = appState.cart
      let finalJson = { products_transactions: []}
      for(const item in cart) {
        finalJson.products_transactions.push({product_id: item.product.id, start_time: item.start_date, end_time: item.end_time})
      }
      console.log(finalJson)
      return finalJson
    }
      axios
      .post(`http://localhost:8001/api/requests/`, {
        products_transactions: products_transactions()
      })
      .then((res) => {
        setAppState((prev)=>{
          return { ...prev, cart: [] }
        })
      })
      .then(()=>{
        navigate("/confirmation")
      })}
    const deleteItem = function(id) {
      for(let i = 0; i < appState.cart.length; i++) {
        if(appState.cart[i].product.id === id) {
          subtotal -= appState.cart[i].product.price_per_day_cents/100
          depositSubtotal -= appState.cart[i].product.deposit_amount_cents/100
          total = total - appState.cart[i].product.deposit_amount_cents/100 - appState.cart[i].product.price_per_day_cents/100
          appState.cart.splice(i, 1)
        }
      } 
      navigate('/cart')
    }

  const cartItems = appState.cart.map((item=> {
    let start_date = new Date(item.start_date)
    let end_date = new Date(item.end_date)
    let itemTotal = (item.product.price_per_day_cents/100)*Math.floor((end_date - start_date) / (1000 * 3600 * 24))
    subtotal += itemTotal;
    depositSubtotal += item.product.deposit_amount_cents/100
    total = total + itemTotal +item.product.deposit_amount_cents/100
    return(
     <TableRow>
        <TableCell>{item.product.name}</TableCell>
        <TableCell>{item.start_date}</TableCell>
        <TableCell>{item.end_date}</TableCell>
        <TableCell>${itemTotal}</TableCell>
        <TableCell>${(item.product.deposit_amount_cents/100)}</TableCell>
        <TableCell><Button onClick={()=>{deleteItem(item.product.id)}}><DeleteIcon /></Button></TableCell>
     </TableRow> 
    )}))
return( 
<Grid marginTop='5px' >
<Table>
  <TableBody>
  <TableRow>
      <TableCell>Product Name</TableCell>
      <TableCell>Rental Start Date</TableCell>
      <TableCell>Rental End Date</TableCell>
      <TableCell>Price</TableCell>
      <TableCell>Deposit Amount</TableCell>
      <TableCell>Delete From Cart</TableCell>
  </TableRow>
  {cartItems}
  <TableRow>
    <TableCell></TableCell>
    <TableCell></TableCell>
    <TableCell>Subtotals</TableCell>
    <TableCell>${subtotal}</TableCell>
    <TableCell>${depositSubtotal}</TableCell>
    <TableCell>Total: ${total}</TableCell>
  </TableRow>
  <TableRow>
    <TableCell></TableCell>
    <TableCell></TableCell>
    <TableCell></TableCell>
    <TableCell></TableCell>
    <TableCell></TableCell>
    <TableCell>
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{ mt: 1 }}
        >
          <Button variant='contained' type='submit'>Request Items</Button>
        </Box>
    </TableCell>
  </TableRow>
  </TableBody>
</Table>
</Grid>

)};