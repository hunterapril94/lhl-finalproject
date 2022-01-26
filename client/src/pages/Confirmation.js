import { Grid } from "@mui/material";
import { useNavigate } from "react-router";
import theme from "../components/styles";

export default function Confirmation() {
  const navigate = useNavigate();

  setTimeout(() => {
    navigate("/my-requests");
  }, 2000);
  return (
    <Grid
      color={theme.palette.primary.main}
      container
      justifyContent="space-around"
    >
      <h1>Your items have been requested! </h1>
    </Grid>
  );
}
