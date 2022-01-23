// import React from "react";
// import axios from "axios";
// import { useState } from "react";
// import { useEffect } from "react";
// import Review from "./Review";

// const ReviewsList = (props) => {
//   const [reviews, setReviews] = useState();
//   const [isLoading, setIsLoading] = useState(true);
//   console.log(reviews);
//   useEffect(() => {
//     axios
//       .get(`http://localhost:8001/api/products/reviews/${props.productId}`)
//       .then((res) => {
//         console.log(res.data.reviews);
//         setReviews(res.data.reviews);
//         setIsLoading(false);
//         // console.log(res.data.products);
//         // setProducts(res.data.products);
//         // setIsLoading(false);
//         // setAppState((prev) => {
//         //   return { ...prev, auth: res.data.auth };
//         // });
//       })
//       .catch((err) => console.log(err.message));
//   }, []);

//   return isLoading ? (
//     <div>loading</div>
//   ) : (
//     <div>
//       {reviews.map((review) => {
//         // return <div key={review.id}>{review.text}</div>;
//         console.log(review);
//         return <Review key={review.id} text={review.text} />;
//       })}
//     </div>
//   );
// };

// export default ReviewsList;

// import * as React from "react";
// import Box from "@mui/material/Box";
// import ListItem from "@mui/material/ListItem";
// import ListItemButton from "@mui/material/ListItemButton";
// import ListItemText from "@mui/material/ListItemText";
// import { FixedSizeList } from "react-window";

// function renderRow(props) {
//   const { index, style } = props;

//   return (
//     <ListItem style={style} key={index} component="div" disablePadding>
//       <ListItemButton>
//         <ListItemText primary={`Item ${index + 1}`} />
//       </ListItemButton>
//     </ListItem>
//   );
// }
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { FixedSizeList } from "react-window";
import { Grid } from "@mui/material";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import ReviewItem from "./ReviewItem";
import axios from "axios";

// import Review from "./Review";

export default function ReviewList(props) {
  const [reviews, setReviews] = useState();
  const [isLoading, setIsLoading] = useState(true);
  console.log(reviews);
  useEffect(() => {
    axios
      .get(`http://localhost:8001/api/products/reviews/${props.productId}`)
      .then((res) => {
        console.log(res.data.reviews);
        setReviews(res.data.reviews);
        setIsLoading(false);
      })
      .catch((err) => console.log(err.message));
  }, []);
  function renderRow(props, style) {
    const { index } = props;

    return <ReviewItem review={reviews[index]} style={style} />;
  }
  const { index, style } = props;
  return isLoading ? (
    <div></div>
  ) : (
    <Grid item md={7.5} sm={12} xs={12} mr={1}>
      <Box
        sx={{
          width: "100%",
          height: 250,
          maxWidth: 550,
          bgcolor: "background.paper",
          display: "flex",
          justifyContent: "center",
          mt: 2,
        }}
      >
        <FixedSizeList
          height={240}
          width={"100%"}
          itemSize={90}
          itemCount={reviews.length}
        >
          {renderRow}
          {/* <Review index={index} style={style} /> */}
        </FixedSizeList>
      </Box>
    </Grid>
  );
}
