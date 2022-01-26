import { useState, useEffect } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Button } from "@mui/material";
import axios from "axios";
import { useOutletContext } from "react-router";
import { dayFormater, dayCalulator } from "./MyRequests";
import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { Grid } from "@mui/material";
import { TextField } from "@mui/material";
import { Rating } from "@mui/material";

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

export default function MyTransactions() {
  let number = 1;
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [appState, setAppState] = useOutletContext();
  const [itemInfo, setItemInfo] = useState();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(0);
  const handleClose = function () {
    setOpen(false);
    setValue(0);
  };
  const handleSubmit = function (e) {
    // e.preventDefault();
    handleClose();
    const data = new FormData(e.currentTarget);
    axios.post(`http://localhost:8001/api/products/reviews/new`, {
      product_id: itemInfo.product_id,
      title: data.get("title"),
      text: data.get("text"),
      stars: value,
    });
    // console.log({
    //   product_id: itemInfo.product_id,
    //   title: data.get("title"),
    //   text: data.get("text"),
    //   stars: value,
    // });
  };
  const handleOpen = function (product_id) {
    setOpen(true);
    setItemInfo({ product_id });
  };
  useEffect(() => {
    axios
      .get("http://localhost:8001/api/users/transaction-history")
      .then((res) => {
        setTransactions(res.data.transactionHistory);
        setIsLoading(false);
        setAppState((prev) => {
          return { ...prev, auth: res.data.auth };
        });
      })

      .catch((err) => console.log(err.message));
  }, []);

  const paperOrNot = transactions.length !== 0 ? Paper : null;
  return (
    <>
      <Typography variant="h4" component="h3" sx={{ marginTop: 2 }}>
        Request History
      </Typography>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "center",

          marginTop: 5,
        }}
      >
        <TableContainer component={paperOrNot}>
          {transactions.length === 0 && (
            <Typography sx={{ textAlign: "center" }}>
              You have no transaction history
            </Typography>
          )}
          <Table sx={{ minWidth: 550 }} aria-label="simple table">
            {transactions.length !== 0 && (
              <TableHead>
                <TableRow>
                  <TableCell align="center">number</TableCell>
                  <TableCell align="center">Item</TableCell>
                  <TableCell align="center">date</TableCell>
                  <TableCell align="center">amount</TableCell>
                  <TableCell align="center">status</TableCell>
                </TableRow>
              </TableHead>
            )}
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow
                  key={transaction.products_transactions_id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center">{number++}</TableCell>
                  <TableCell align="center">{transaction.name}</TableCell>

                  <TableCell align="center">
                    {dayFormater(
                      transaction.status === "returned"
                        ? transaction.end_time
                        : transaction.start_time
                    )}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      color:
                        transaction.status === "Returned" || "returned"
                          ? "green"
                          : "red",
                    }}
                  >
                    $
                    {transaction.status === "canceled" ||
                    transaction.status === "rejected"
                      ? 0
                      : (dayCalulator(
                          transaction.start_time,
                          transaction.end_time
                        ) *
                          transaction.price_per_day_cents) /
                        100}
                  </TableCell>
                  <TableCell
                    sx={{
                      color:
                        transaction.status === "Returned" || "returned"
                          ? "green"
                          : "red",
                    }}
                    align="center"
                  >
                    {transaction.status}
                  </TableCell>
                  <TableCell>
                    <Button
                      color="secondary"
                      onClick={() => {
                        handleOpen(transaction.product_id);
                      }}
                    >
                      Leave Review
                    </Button>
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
                            onSubmit={(e) => {
                              e.preventDefault();
                              handleSubmit(e);
                            }}
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
                              id="title"
                              label="Title"
                              name="title"
                            />
                            <TextField
                              margin="normal"
                              required
                              fullWidth
                              id="text"
                              label="Text"
                              name="text"
                              multiline
                              rows="6"
                            />
                            <Rating
                              name="stars"
                              value={value}
                              precision={1}
                              onChange={(event, newValue) => {
                                setValue(newValue);
                              }}
                            />
                            <Button
                              type="submit"
                              fullWidth
                              size="large"
                              variant="contained"
                              color="secondary"
                              sx={{ marginTop: "10px" }}
                              //doesnt need click handler dont add again
                            >
                              {itemInfo ? "Save" : "Create"}
                            </Button>
                          </Box>
                        </Grid>
                      </Fade>
                    </Modal>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}
