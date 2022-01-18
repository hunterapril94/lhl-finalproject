import { createTheme, MenuItem, IconButton } from "@mui/material";


const theme = createTheme({
  palette: {
    primary: {
      main: "#05386B"
    },
    secondary: {
      main: "#8EE4AF",
      light: "#EDF5E1"
    },
    tertiary: {
      main: "#EDF5E1"
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