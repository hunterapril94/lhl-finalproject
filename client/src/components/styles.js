import { createTheme, MenuItem, IconButton } from "@mui/material";


const theme = createTheme({
  palette: {
    primary: {
      main: "#05386B",
      light: "#6987A6",
      dark: "#032140"
    },
    secondary: {
      main: "#3A8A50",
      light: "#BFF5CE",
      dark: "#1D4528"
    },
    tertiary: {
      main: "#d5d6d8"
    }
  },
  components: {
    Link: {
      color: "#EDF5E1"
    },
    IconButton: {
      color: '#EDF5E1'
    },
    Grid: {
      color: '#EDF5E1'
    }
  }

});

export default theme;