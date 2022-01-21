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
import { Box } from "@mui/system";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import { AcceptButton, CancelButton, RejectButton } from "./Buttons.js";

const dayCalulator = (startDay, endDate) => {
  return Math.floor((Date.parse(endDate) - Date.parse(startDay)) / 86400000);
};

const dayFormater = (date) => {
  return date.toString().slice(0, -14);
};

export default function MyRequests() {
  const [appState, setAppState] = useOutletContext();
  const [isLoading, setIsLoading] = useState(true);
  const [IncomingRequests, setIncomingRequests] = useState([]);
  const [OutgoingRequests, setOutgoingRequests] = useState([]);
  const [selectedTab, setSelectedTab] = React.useState(0);

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  useEffect(() => {
    axios
      .get("http://localhost:8001/api/requests/pending")
      .then((res) => {
        const { pendingIncommingLendRequests, pendingOutgoingBorrowRequests } =
          res.data;

        setIncomingRequests(pendingIncommingLendRequests);
        setOutgoingRequests(pendingOutgoingBorrowRequests);
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
        My Pending Requests
      </Typography>
      <Typography
        variant="h6"
        component="h3"
        sx={{ marginTop: 3, textAlign: "center" }}
      ></Typography>
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
        <Tabs value={selectedTab} onChange={handleChange}>
          <Tab label="Incoming requests" />
          <Tab label="Outgoing requests" />
        </Tabs>
        {selectedTab === 0 && (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 550 }}>
              <TableHead>
                <TableRow>
                  <TableCell>Item</TableCell>
                  <TableCell align="center">Borrower's email</TableCell>
                  <TableCell align="center">cost per day</TableCell>
                  <TableCell align="center">days requested</TableCell>
                  <TableCell align="center">From</TableCell>
                  <TableCell align="center">to</TableCell>
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
                      ${request.price_per_day_cents / 100}
                    </TableCell>
                    <TableCell align="center">
                      {dayCalulator(request.start_time, request.end_time)}
                    </TableCell>
                    <TableCell align="center">
                      {dayFormater(request.start_time)}
                    </TableCell>
                    <TableCell align="center">
                      {dayFormater(request.end_time)}
                    </TableCell>
                    <TableCell align="center">
                      $
                      {(dayCalulator(request.start_time, request.end_time) *
                        request.price_per_day_cents) /
                        100}
                    </TableCell>
                    <TableCell align="center">
                      <AcceptButton
                        request={request}
                        requests={IncomingRequests}
                        setIncomingRequests={setIncomingRequests}
                      />
                      <RejectButton
                        request={request}
                        requests={IncomingRequests}
                        setIncomingRequests={setIncomingRequests}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
        {selectedTab === 1 && (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 550 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Item</TableCell>
                  <TableCell align="center">Owner's Email</TableCell>
                  <TableCell align="center">cost per day</TableCell>
                  <TableCell align="center">days requested</TableCell>
                  <TableCell align="center">From</TableCell>
                  <TableCell align="center">to</TableCell>
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
                      ${request.price_per_day_cents / 100}
                    </TableCell>
                    <TableCell align="center">
                      {dayCalulator(request.start_time, request.end_time)}
                    </TableCell>
                    <TableCell align="center">
                      {dayFormater(request.start_time)}
                    </TableCell>
                    <TableCell align="center">
                      {dayFormater(request.end_time)}
                    </TableCell>
                    <TableCell align="center">
                      $
                      {(dayCalulator(request.start_time, request.end_time) *
                        request.price_per_day_cents) /
                        100}
                    </TableCell>
                    <TableCell align="center">
                      <CancelButton
                        request={request}
                        requests={OutgoingRequests}
                        setIncomingRequests={setOutgoingRequests}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </>
  );
}
