import { useState, useEffect } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import { Box, flexbox } from "@mui/system";
import { Button } from "@mui/material";
import axios from "axios";
import { useOutletContext } from "react-router";
import { dayFormater, dayCalulator } from "./MyRequests";
import { Link } from "react-router-dom";

export default function MyTransactions() {
  let number = 1;
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [appState, setAppState] = useOutletContext();
  useEffect(() => {
    axios
      .get("http://localhost:8001/api/users/transaction-history")
      .then((res) => {
        console.log(res.data.transactionHistory);
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
      <Typography
        variant="h4"
        component="h3"
        sx={{ marginTop: 3, textAlign: "center" }}
      >
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
            <Typography>You have no transaction history</Typography>
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
                        transaction.status === "returned" ? "green" : "red",
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
                        transaction.status === "returned" ? "green" : "red",
                    }}
                    align="center"
                  >
                    {transaction.status}
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
