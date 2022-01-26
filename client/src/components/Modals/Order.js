import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { Grid } from "@mui/material";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import { textAlign } from "@mui/system";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function Order(props) {
  return (
    <div>
      <Button
        color="secondary"
        size="large"
        variant="contained"
        onClick={props.handleOpen}
      >
        Pick Your Dates
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={props.open}
        onClose={props.handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.open}>
          <Grid>
            <Box
              component="form"
              margin="auto"
              sx={style}
              onSubmit={props.handleSubmit}
            >
              <Typography
                id="transition-modal-title"
                variant="h4"
                component="h2"
                sx={{ mb: 2, textAlign: "center" }}
              >
                Pick Your Dates
              </Typography>
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
                color="text.secondary"
              >
                Select Your Start Date:
              </Typography>
              <TextField
                required
                id="start"
                name="start"
                label="Start Date"
                type="date"
                sx={{ width: 320, marginTop: "10px" }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <Typography
                id="transition-modal-description"
                variant="h6"
                component="h2"
                sx={{ mt: 2 }}
                color="text.secondary"
              >
                Select you end date:
              </Typography>
              <TextField
                required
                id="end"
                name="end"
                label="End Date"
                type="date"
                sx={{ mb: 3, width: 320, marginTop: "10px" }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <Button
                onSubmit={props.handleSubmit}
                color="secondary"
                type="submit"
                fullWidth
                size="large"
                variant="contained"
                sx={{ marginTop: "10px" }}
              >
                Add to Cart
              </Button>
            </Box>
          </Grid>
        </Fade>
      </Modal>
    </div>
  );
}
