import React from "react";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import AvatarWithColor from "../AvatarWithColor/AvatarWithColor";

const ReviewItem = (props) => {
  return (
    <ListItem alignItems="flex-start" key={props.index} component="div">
      <ListItemAvatar>
        <AvatarWithColor
          firstName={props.review.first_name}
          lastName={props.review.last_name}
        />
        {/* <Avatar sx={{ bgcolor: "deeppink" }}>
          {props.review.first_name.charAt(0)}
        </Avatar> */}
      </ListItemAvatar>
      <ListItemText
        primary={props.review.title}
        secondary={
          <>
            <Typography
              sx={{ display: "inline" }}
              component="span"
              variant="body2"
              color="text.primary"
            >
              {props.review.first_name} {props.review.last_name}
            </Typography>
            {`. ${props.review.neighborhood} — ${props.review.text}`}
          </>
        }
      />
    </ListItem>
  );
};

export default ReviewItem;
