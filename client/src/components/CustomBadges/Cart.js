import * as React from "react";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

export default function CustomizedBadges(props) {
  return (
    <IconButton aria-label="cart">
      <StyledBadge badgeContent={props.count} sx={{ color: "Chartreuse" }}>
        <ShoppingCartIcon
          sx={{ fontSize: 45, padding: 0, margin: 0, color: "white" }}
        />
      </StyledBadge>
    </IconButton>
  );
}
