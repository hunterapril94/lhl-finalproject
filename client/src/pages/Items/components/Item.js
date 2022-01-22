import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

export default function Item(props) {
  const { productId, name, amount, returnDate, retun, ownerName, email } =
    props;
  console.log(props);
  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {ownerName}
          </Typography>
          <Typography variant="h5" component="div">
            {name}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            totall: ${amount}
          </Typography>
          <Typography variant="body2">
            {returnDate}
            <br />
            {email}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={() => {}}>
            Mark as returned
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}
