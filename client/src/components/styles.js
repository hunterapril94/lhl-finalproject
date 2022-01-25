import {
  createTheme,
  MenuItem,
  IconButton,
  CardContent,
  Button,
} from "@mui/material";
import { fontFamily } from "@mui/system";

const theme = createTheme({
  palette: {
    primary: {
      // #05386B
      main: "#000000",
      light: "#6987A6",
      dark: "#032140",
    },
    secondary: {
      main: "#05386B",
      dark: "#032140",
    },
    tertiary: {
      main: "#d5d6d8",
      dark: "#acaeb2",
    },
  },
  components: {
    AppBar: "000000",
    Link: {
      color: "#EDF5E1",
    },
    IconButton: {
      color: "#EDF5E1",
    },
    Grid: {
      color: "#EDF5E1",
      fontFamily: "Roboto",
      fontWeight: "regular",
      // backgroundColor: "#1D4528",
    },
    Button: {
      // color: "#3A8A50",
    },
  },
});

export default theme;
