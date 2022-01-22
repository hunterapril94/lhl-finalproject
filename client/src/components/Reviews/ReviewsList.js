import React from "react";
import axios from "axios";

const ReviewsList = (props) => {
  axios
    .get("http://localhost:8001/api/products/reviews/1")
    .then((res) => {
      console.log(res);
      // console.log(res.data.products);
      // setProducts(res.data.products);
      // setIsLoading(false);
      // setAppState((prev) => {
      //   return { ...prev, auth: res.data.auth };
      // });
    })
    .catch((err) => console.log(err.message));
  return <div></div>;
};

export default ReviewsList;
