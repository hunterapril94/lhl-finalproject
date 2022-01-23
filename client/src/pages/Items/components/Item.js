import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import { ReturnButton } from "../../Requests/Buttons";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

export default function Item(props) {
  const {
    name,
    amount,
    returnDate,
    setProducts,
    items,
    item,
    ownerName,
    email,
    phone,
  } = props;
  console.log(props);
  return (
    <Box sx={{ minWidth: 275, m: "2rem" }}>
      {/* <Card variant="outlined"> */}
      <Card sx={{ display: "flex" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography variant="h5" component="div">
            {name}
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Belongs to {ownerName}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            You paid ${amount} for this item
          </Typography>
          <Typography sx={{ mb: 1.5 }}>
            Dont' forget to return it on {returnDate}
            <br />
            The owner's email is {email} and the phone number is {phone} if you
            need it.
          </Typography>
        </CardContent>
        <CardActions>
          <ReturnButton
            size="small"
            item={item}
            items={items}
            setProducts={setProducts}
          ></ReturnButton>
        </CardActions>
      </Card>
    </Box>
  );
}
