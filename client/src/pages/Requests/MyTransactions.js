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

export default function MyTransactions() {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [appState, setAppState] = useOutletContext();
  useEffect(() => {
    axios
      .get("http://localhost:8001/api/requests/history")
      .then((res) => {
        setTransactions(res.data);
        setIsLoading(false);
        setAppState((prev) => {
          return { ...prev, auth: res.data.auth };
        });
      })

      .catch((err) => console.log(err.message));
  }, []);
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
        <TableContainer component={transactions.length !== 0 && Paper}>
          {transactions.length === 0 && (
            <Typography>You have no transaction history</Typography>
          )}
          <Table sx={{ minWidth: 550 }} aria-label="simple table">
            {transactions.length !== 0 && (
              <TableHead>
                <TableRow>
                  <TableCell>number</TableCell>
                  <TableCell>Item</TableCell>
                  <TableCell align="center">date</TableCell>
                  <TableCell align="center">amount</TableCell>
                  <TableCell align="center">status</TableCell>
                </TableRow>
              </TableHead>
            )}
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow
                  key={transaction.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {transaction.id}
                  </TableCell>
                  <TableCell align="center">{transaction.name}</TableCell>

                  <TableCell align="center">
                    ${dayFormater(transaction.start_time)}
                  </TableCell>
                  <TableCell align="center">
                    ${}
                    {(dayFormater(transaction.start_time) *
                      transaction.price_per_day_cents) /
                      100}
                  </TableCell>
                  <TableCell>transaction.status</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}
