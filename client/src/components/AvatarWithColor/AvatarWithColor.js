import React from "react";
import { Avatar } from "@mui/material";

const AvatarWithColor = (props) => {
  const determineColor = (firstName) => {
    const charCode = Number(firstName.toLowerCase().charCodeAt(0));
    // console.log(charCode);
    //97-112

    if (charCode < 105) {
      return "aqua";
    }
    if (charCode < 110) {
      return "coral";
    }
    if (charCode < 115) {
      return "greenyellow";
    }

    return "deeppink";
  };
  return (
    <Avatar sx={{ bgcolor: determineColor(props.firstName) }}>
      {props.firstName.charAt(0)}
    </Avatar>
  );
};

export default AvatarWithColor;
