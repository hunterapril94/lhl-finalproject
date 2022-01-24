import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";

export default function SearchBar() {
  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        m: 1,
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="standard-basic"
        label="Search"
        variant="standard"
        sx={{ pb: 2, width: "30ch" }}
      />
      <Button>
        <SearchSharpIcon />
      </Button>
    </Box>
  );
}
