import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { FixedSizeList } from "react-window";
import { Grid } from "@mui/material";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import ReviewItem from "./ReviewItem";
import axios from "axios";

// import Review from "./Review";

export default function ReviewList(props) {
  const [reviews, setReviews] = useState();
  const [isLoading, setIsLoading] = useState(true);
  // console.log(reviews);
  useEffect(() => {
    axios
      .get(`http://localhost:8001/api/products/reviews/${props.productId}`)
      .then((res) => {
        //  console.log(res.data.reviews);
        setReviews(res.data.reviews);
        setIsLoading(false);
      })
      .catch((err) => console.log(err.message));
  }, []);
  if (isLoading) {
    return <></>;
  }
  return (
    <List
      sx={{
        width: "100%",
        maxWidth: 550,
        bgcolor: "background.paper",
        position: "relative",
        overflow: "auto",
        maxHeight: 210,
        mb: 3,
        "& ul": { padding: 0 },
      }}
      subheader={<li />}
    >
      <ul>
        {reviews.map((review, index) => (
          // <ListItem key={index}>
          //   <ListItemText primary={`Item ${item}`} />
          // </ListItem>
          <ReviewItem key={index} review={review} />
        ))}
      </ul>
    </List>
  );
}
