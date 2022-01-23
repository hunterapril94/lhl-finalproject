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

function renderRow(props) {
  const { index, style } = props;

  return (
    <ListItem style={style} key={index} component="div" disablePadding>
      <ListItemButton>
        <ListItemText primary={`Item ${index + 1}`} />
      </ListItemButton>
    </ListItem>
  );
}

export default function VirtualizedList() {
  return (
    <Box
      sx={{
        width: "100%",
        height: 250,
        maxWidth: 550,
        bgcolor: "background.paper",
        display: "flex",
        justifyContent: "center",
        mt: 2,
        mb: 2,
      }}
    >
      <FixedSizeList
        height={250}
        width={450}
        itemSize={46}
        itemCount={200}
        overscanCount={5}
      >
        {renderRow}
      </FixedSizeList>
    </Box>
  );
}
