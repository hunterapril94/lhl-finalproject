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
import * as React from "react";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { FixedSizeList } from "react-window";
import { Grid } from "@mui/material";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

function renderRow(props) {
  const { index, style } = props;

  return (
    // <ListItem style={style} key={index} component="div" disablePadding>
    //   <ListItemText primary={`Item ${index + 1}`} />

    // </ListItem>

    <ListItem alignItems="flex-start" style={style} key={index} component="div">
      <ListItemAvatar>
        <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
      </ListItemAvatar>
      <ListItemText
        primary="Summer BBQ"
        secondary={
          <React.Fragment>
            <Typography
              sx={{ display: "inline" }}
              component="span"
              variant="body2"
              color="text.primary"
            >
              to Scott, Alex, Jennifer
            </Typography>
            {" — Wish I could come, but I'm out of town this…"}
          </React.Fragment>
        }
      />
    </ListItem>
  );
}

export default function ReviewList() {
  return (
    <Grid md={7.5} sm={12} xs={12} mr={1}>
      <Box
        sx={{
          width: "100%",
          height: 180,
          maxWidth: 550,
          bgcolor: "background.paper",
          display: "flex",
          justifyContent: "center",
          mt: 2,
          mb: 2,
        }}
      >
        <FixedSizeList
          height={180}
          width={"100%"}
          itemSize={70}
          itemCount={200}
          overscanCount={5}
        >
          {renderRow}
        </FixedSizeList>
      </Box>
    </Grid>
  );
}
