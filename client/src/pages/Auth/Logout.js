import axios from "axios";
import { Grid } from "@mui/material";
import { useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import theme from "../../components/styles";

const Logout = () => {
  const [appState, setAppState] = useOutletContext();
  const navigate = useNavigate();
  useEffect(() => {
    axios.post("http://localhost:8001/api/users/logout").then((res) => {
      setAppState((prev) => {
        return { ...prev, auth: false, cart: [], profile: {} };
      });
    });
  }, []);
  return (
    <Grid
      color={theme.palette.primary.main}
      container
      justifyContent="space-around"
    >
      <h1>See you soon!!!</h1>
    </Grid>
  );
};

export default Logout;
