import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { Grid } from "@mui/material";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";

import InputAdornment from "@mui/material/InputAdornment";
import { useState } from "react";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function ReviewNew(props) {
  const [itemInfo, setItemInfo] = useState()
  const [open, setOpen] = useState(props.open);
  const handleClose = function() {}
  const handleSubmit = function() {}
  const handleOnChange = function() {}
  
  return (<>
        <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Grid>
            <Box
              component="form"
              margin="auto"
              sx={style}
              onSubmit={handleSubmit}
            >
              <Typography
                id="transition-modal-title"
                variant="h4"
                component="h2"
                sx={{ mb: 2, textAlign: "center" }}
              >
                Review Item
              </Typography>
              <TextField
                margin="normal"
                required
                fullWidth
                value=''
                id="title"
                label="Title"
                name="title"
                onChange={handleOnChange}
              />
              <Box
                sx={{
                  width: 1,
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                noValidate
                autoComplete="off"
              >


              </Box>

              <TextField
                margin="normal"
                required
                fullWidth
                id="text"
                label="Text"
                name="text"
                multiline
                rows="6"
                value=''
                onChange={handleOnChange}
              />
              <Button
                type="submit"
                fullWidth
                size="large"
                variant="contained"
                color="secondary"
                sx={{ marginTop: "10px" }}
                onClick={(e) => {
                  // e.preventDefault();
                  handleSubmit(itemInfo);
                }}
              >
                {itemInfo ? "Save" : "Create"}
              </Button>
            </Box>
          </Grid>
        </Fade>
      </Modal>
  </>)
}