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
import { Box, flexbox } from "@mui/system";
import { Button } from "@mui/material";

function dayParser(startDay, endDate) {
  return Math.floor((Date.parse(endDate) - Date.parse(startDay)) / 86400000);
}

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

export default function MyRequests() {
  const [requests, setRequests] = useState([]);
  const [appState, setAppState] = useOutletContext();

  useEffect(() => {
    axios
      .get("http://localhost:8001/api/requests/pending")
      .then((res) => {
        console.log(res.data.pendingIncommingLendRequests);
        setRequests(res.data.pendingIncommingLendRequests);
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
            <TableHead>
              <TableRow>
                <TableCell>Item</TableCell>
                <TableCell align="right">Requester</TableCell>
                <TableCell align="right">cost per day</TableCell>
                <TableCell align="right">days requested</TableCell>
                <TableCell align="right">total revenue</TableCell>
                <TableCell align="right">More Details</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {requests.map((request) => (
                <TableRow
                  key={request.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {request.name}
                  </TableCell>
                  <TableCell align="right">{request.calories}</TableCell>
                  <TableCell align="right">
                    {request.price_per_day_cents / 100} $
                  </TableCell>
                  <TableCell align="right">
                    {dayParser(request.start_time, request.end_time)}
                  </TableCell>
                  <TableCell align="right">
                    {(dayParser(request.start_time, request.end_time) *
                      request.price_per_day_cents) /
                      100}
                    $
                  </TableCell>
                  <TableCell align="right">
                    <Button>Details</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {/* <h1>{requests}</h1> */}
      </Box>
    </>
  );
}
