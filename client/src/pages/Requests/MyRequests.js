import * as React from "react";
import { useState, useEffect } from "react";
import { useOutletContext } from "react-router";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import { Box, flexbox, typography } from "@mui/system";
import { Button } from "@mui/material";

import { AcceptButton } from "./Buttons.js";

function dayParser(startDay, endDate) {
  return Math.floor((Date.parse(endDate) - Date.parse(startDay)) / 86400000);
}

export default function MyRequests() {
  const [IncomingRequests, setIncomingRequests] = useState([]);
  const [OutgoingRequests, setOutgoingRequests] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8001/api/requests/pending")
      .then((res) => {
        const { pendingIncommingLendRequests, pendingOutgoingBorrowRequests } =
          res.data;
        console.log(res.data);
        setIncomingRequests(pendingIncommingLendRequests);
        setOutgoingRequests(pendingOutgoingBorrowRequests);
        // console.log(requests);
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
        My Pending Requests
      </Typography>
      <Typography
        variant="h6"
        component="h3"
        sx={{ marginTop: 3, textAlign: "center" }}
      >
        Incoming Requests:
      </Typography>
      <Box
        component="form"
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",

          marginTop: 5,
        }}
      >
        <TableContainer component={Paper} sx={{ width: 900 }}>
          <Table sx={{ minWidth: 550 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Item</TableCell>
                <TableCell align="center">Contact</TableCell>
                <TableCell align="center">cost per day</TableCell>
                <TableCell align="center">days requested</TableCell>
                <TableCell align="center">total revenue</TableCell>
                <TableCell align="center"></TableCell>
                <TableCell align="center"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {IncomingRequests.map((request) => (
                <TableRow
                  key={request.products_transactions_id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {request.name}
                  </TableCell>
                  <TableCell align="center">
                    {request.requester_email}
                  </TableCell>

                  <TableCell align="center">
                    {request.price_per_day_cents / 100} $
                  </TableCell>
                  <TableCell align="center">
                    {dayParser(request.start_time, request.end_time)}
                  </TableCell>
                  <TableCell align="center">
                    {(dayParser(request.start_time, request.end_time) *
                      request.price_per_day_cents) /
                      100}
                    $
                  </TableCell>
                  <AcceptButton
                    request={request}
                    requests={IncomingRequests}
                    setIncomingRequests={setIncomingRequests}
                  />
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Typography variant="h6" component="h3">
          Outgoing request:
        </Typography>
        <TableContainer component={Paper} sx={{ width: 900 }}>
          <Table sx={{ minWidth: 550 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Item</TableCell>
                <TableCell align="center">Contact</TableCell>
                <TableCell align="center">cost per day</TableCell>
                <TableCell align="center">days requested</TableCell>
                <TableCell align="center">total revenue</TableCell>
                <TableCell align="center"></TableCell>
                <TableCell align="center"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {OutgoingRequests.map((request) => (
                <TableRow
                  key={request.products_transactions_id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {request.name}
                  </TableCell>
                  <TableCell align="center">{request.owner_email}</TableCell>

                  <TableCell align="center">
                    {request.price_per_day_cents / 100} $
                  </TableCell>
                  <TableCell align="center">
                    {dayParser(request.start_time, request.end_time)}
                  </TableCell>
                  <TableCell align="center">
                    {(dayParser(request.start_time, request.end_time) *
                      request.price_per_day_cents) /
                      100}
                    $
                  </TableCell>
                  <TableCell align="center">
                    <Button>Cancel</Button>
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
