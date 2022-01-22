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

export default function MyTransactions() {
  const [Transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [appState, setAppState] = useOutletContext();
  useEffect(() => {
    axios
      .get("http://localhost:8001/api/requests/history")
      .then((res) => {
        const { pendingIncommingLendRequests, pendingOutgoingBorrowRequests } =
          res.data;

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
        Transaction History
      </Typography>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "center",

          marginTop: 5,
        }}
      >
        <TableContainer component={Paper} sx={{ width: 900 }}>
          <Table sx={{ minWidth: 550 }} aria-label="simple table">
            {Transactions.length !== 0 && (
              <TableHead>
                <TableRow></TableRow>
              </TableHead>
            )}
            <TableBody></TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}
