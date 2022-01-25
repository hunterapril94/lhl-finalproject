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
import { TableFooter, TextField, Typography } from "@mui/material";
import { Box, typography } from "@mui/system";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import AvatarWithColor from "../../components/AvatarWithColor/AvatarWithColor.js";
import { Grid } from "@mui/material";
import { Button } from "@mui/material";

import {
  AcceptButton,
  CancelButton,
  RejectButton,
  MessageButton,
} from "./Buttons.js";
import theme from "../../components/styles.js";

export const dayCalulator = (startDay, endDate) => {
  return Math.floor((Date.parse(endDate) - Date.parse(startDay)) / 86400000);
};

export const dayFormater = (date) => {
  return date.toString().slice(0, -14);
};

export const amountCalculator = (startDay, endDay, pricePerDay) => {
  const days = Math.floor(
    (Date.parse(endDay) - Date.parse(startDay)) / 86400000
  );
  return (days * pricePerDay) / 100;
};

export default function MyRequests() {
  const [appState, setAppState] = useOutletContext();
  const [isLoading, setIsLoading] = useState(true);
  const [IncomingRequests, setIncomingRequests] = useState([]);
  const [OutgoingRequests, setOutgoingRequests] = useState([]);
  const [selectedTab, setSelectedTab] = React.useState(0);
  const [messageDisplay, setMessageDisplay] = useState("none");
  const [messages, setMessages] = useState([
    { first_name: "April", text: "Can I come at 4?" },
  ]);
  const [transactionId, setTransactionId] = useState();

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  useEffect(() => {
    axios
      .get("http://localhost:8001/api/requests/pending")
      .then((res) => {
        const { pendingIncommingLendRequests, pendingOutgoingBorrowRequests } =
          res.data;
        console.log(res.data);
        setIncomingRequests(pendingIncommingLendRequests);
        setOutgoingRequests(pendingOutgoingBorrowRequests);
        setIsLoading(false);
        setAppState((prev) => {
          return { ...prev, auth: res.data.auth };
        });
      })

      .catch((err) => console.log(err.message));
  }, [setAppState]);

  const message = function (event, id) {
    event.preventDefault();
    axios
      .get(`http://localhost:8001/api/requests/messages/${id}`)
      .then((res) => {
        // console.log(res.data)
        setMessages(res.data.messages);
      });

    if (messageDisplay === "none") {
      setMessageDisplay("inline-block");
    } else {
      setMessageDisplay("none");
    }
    setTransactionId(id);
  };
  const send = function (event, transactionId, firstName) {
    event.preventDefault();
    const time = Date.now();
    const data = new FormData(event.currentTarget);
    const text = data.get("text");
    setMessages((prev) => {
      return [...prev, { first_name: firstName, text }];
    });
    console.log(transactionId, text);
    axios.post(`http://localhost:8001/api/requests/messages`, {
      product_transaction_id: transactionId,
      text: text,
    });
    // console.log(messages)
    document.getElementById("text").value = "";
  };

  const paperOrNot = OutgoingRequests.length !== 0 ? Paper : null;
  const paperOrNot2 = IncomingRequests.length !== 0 ? Paper : null;

  return (
    <>
      <Typography
        variant="h4"
        component="h3"
        sx={{ marginTop: 3, textAlign: "center" }}
      >
        My Pending Requests
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
        <Tabs value={selectedTab} onChange={handleChange}>
          <Tab label="Incoming requests" />
          <Tab label="Outgoing requests" />
        </Tabs>
        {selectedTab === 0 && (
          <TableContainer component={paperOrNot2}>
            {IncomingRequests.length === 0 && (
              <Typography>You have no pending incoming request</Typography>
            )}
            <Table sx={{ minWidth: 550 }}>
              {IncomingRequests.length !== 0 && (
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
                    <TableCell align="center"></TableCell>
                  </TableRow>
                </TableHead>
              )}
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
                      {amountCalculator(
                        request.start_time,
                        request.end_time,
                        request.price_per_day_cents
                      )}
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
                    <TableCell>
                      <Box
                        component="form"
                        handleSubmit={(event) => {
                          message(event, request.products_transactions_id);
                        }}
                      >
                        <MessageButton
                          handleSubmit={(event) => {
                            message(event, request.products_transactions_id);
                          }}
                        />
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
        {selectedTab === 1 && (
          <TableContainer component={paperOrNot}>
            {OutgoingRequests.length === 0 && (
              <Typography>You have no pending outgoing request</Typography>
            )}
            <Table sx={{ minWidth: 550 }} aria-label="simple table">
              {OutgoingRequests.length !== 0 && (
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
                    <TableCell align="center"></TableCell>
                  </TableRow>
                </TableHead>
              )}
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
                    <TableCell>
                      <MessageButton
                        handleSubmit={(event) => {
                          message(event, request.products_transactions_id);
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>

      <TableContainer
        sx={{ position: "fixed", bottom: "0", right: "0", width: "300px" }}
      >
        <Table sx={{ width: "300px" }}>
          <TableHead
            sx={{ backgroundColor: theme.palette.primary.main, color: "white" }}
            onClick={() => {
              setMessageDisplay("none");
            }}
          >
            <TableRow>
              <TableCell sx={{ color: "white" }}>Messages</TableCell>
            </TableRow>
          </TableHead>
          <TableBody
            sx={{
              display: messageDisplay,
              backgroundColor: "white",
              width: "300px",
              height: "300px",
              overflowX: "hidden",
              overflowY: "auto",
            }}
          >
            {messages.map((message) => {
              return (
                <TableRow>
                  <TableCell sx={{ display: "flex" }}>
                    <AvatarWithColor firstName={message.first_name} />
                    <Typography sx={{ margin: "10px" }}>
                      {message.text}
                    </Typography>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
          <TableFooter
            sx={{
              display: messageDisplay,
              backgroundColor: "white",
              width: "300px",
            }}
          >
            <TableRow>
              <TableCell>
                <Box
                  component="form"
                  onSubmit={(event) => {
                    send(event, transactionId, appState.profile.first_name);
                  }}
                >
                  <TextField id="text" name="text" />
                  <Button
                    variant="contained"
                    sx={{ marginTop: "10px" }}
                    type="submit"
                  >
                    Send
                  </Button>
                </Box>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </>
  );
}
