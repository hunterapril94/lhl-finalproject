import theme from "../styles";
// import {
//   Card,
//   CardMedia,
//   CardContent,
//   Grid,
//   Fade,
//   // Rating,
//   Button,
//   Box,
// } from "@mui/material";
// import { useNavigate } from "react-router";
// function Product(props) {
//   const navigate = useNavigate();
//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const data = new FormData(event.currentTarget);
//     navigate(`/products/${props.id}`);
//   };
//   // const isBorrowedItems = props.isBorrowedItems ? "row" : "column";
//   const isMyProducts = props.isMyProducts ? "edit" : "Add to Cart";

//   return (
//     <Fade in={true} timeout={1500}>
//       <div className="product">
//         <Grid container>
//           <Card sx={{ maxWidth: 300 }}>
//             <Grid
//               backgroundColor={theme.palette.secondary.dark}
//               color={theme.palette.tertiary.main}
//               container
//               height={550}
//             >
//               <Box sx={{ display: "flex", flexDirection: "column" }}>
//                 <div>
//                   <CardMedia
//                     component="img"
//                     image={props.image}
//                     height="100%"
//                     width="100%"
//                     alt={props.name}
//                   />
//                 </div>
//                 <CardContent>
//                   <p>{props.name}</p>
//                   <p>Category: {props.category}</p>
//                   <p>Price: ${props.price / 100}</p>
//                   <p>Deposit Amount: ${props.deposit_amount / 100}</p>
//                   {/* <h3>Description: {props.description}</h3> */}
//                   <Box
//                     component="form"
//                     onSubmit={handleSubmit}
//                     sx={{ display: "flex" }}
//                   >
//                     <Button type="submit" fullWidth variant="contained">
//                       {isMyProducts}
//                     </Button>
//                   </Box>
//                 </CardContent>
//               </Box>
//             </Grid>
//           </Card>
//         </Grid>
//       </div>
//     </Fade>
//   );
// }
// export default Product;

import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function Product(props) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  console.log(props);

  return (
    <Card sx={{ maxWidth: 400 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe"></Avatar>
        }
        action={
          // <IconButton aria-label="settings">
          //   <MoreVertIcon />
          // </IconButton>

          <Typography>{"hello"}</Typography>
        }
        title={props.name}
        subheader={props.category}
      />
      <CardMedia
        component="img"
        sx={{ height: "200", width: "200" }}
        image={props.image}
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {props.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Method:</Typography>
          <Typography paragraph>
            Heat 1/2 cup of the broth in a pot until simmering, add saffron and
            set aside for 10 minutes.
          </Typography>
          <Typography paragraph>
            Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet
            over medium-high heat. Add chicken, shrimp and chorizo, and cook,
            stirring occasionally until lightly browned, 6 to 8 minutes.
            Transfer shrimp to a large plate and set aside, leaving chicken and
            chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes,
            onion, salt and pepper, and cook, stirring often until thickened and
            fragrant, about 10 minutes. Add saffron broth and remaining 4 1/2
            cups chicken broth; bring to a boil.
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
