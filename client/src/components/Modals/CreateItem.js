import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { Grid } from "@mui/material";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
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

export default function CreateItem(props) {
  const [itemInfo, setItemInfo] = useState({
    name: null,
    category: null,
    price: null,
    deposit: null,
    imageUrl: null,
    description: null,
  });

  const handleOnChange = (e) => {
    const name = e.target.name;
    setItemInfo({
      ...itemInfo,
      [name]: e.target.value,
    });
  };

  // pass in the object as a prob
  // initialize use state with either with props.existing or default

  return (
    <div>
      <Button
        size="large"
        color="primary"
        variant="outlined"
        onClick={props.handleOpen}
      >
        Create item <AddIcon />
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
                Create new item
              </Typography>
              <TextField
                margin="normal"
                required
                fullWidth
                id="itemName"
                label="Item name"
                name="name"
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
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="category"
                  label="Category"
                  name="category"
                  onChange={handleOnChange}
                />

                <TextField
                  margin="normal"
                  sx={{ ml: 2, mr: 2 }}
                  required
                  type="price_per_day_cents"
                  id="price_per_day_cents"
                  label="Price per-day"
                  name="price"
                  type="number"
                  onChange={handleOnChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  }}
                />
                <TextField
                  margin="normal"
                  required
                  type="number"
                  id="deposit_amount_cents"
                  label="Deposit"
                  name="deposit"
                  onChange={handleOnChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  }}
                />
              </Box>
              <TextField
                margin="normal"
                required
                fullWidth
                id="image"
                label="Image url"
                name="imageUrl"
                onChange={handleOnChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="description"
                label="Description"
                name="description"
                multiline
                rows="6"
                onChange={handleOnChange}
              />
              <Button
                type="submit"
                fullWidth
                size="large"
                variant="contained"
                sx={{ marginTop: "10px" }}
                onClick={(e) => {
                  // e.preventDefault();
                  props.handleSubmit(itemInfo);
                }}
              >
                Create
              </Button>
            </Box>
          </Grid>
        </Fade>
      </Modal>
    </div>
  );
}
