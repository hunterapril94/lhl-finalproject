import axios from "axios";
import { TableCell } from "@mui/material";
import { Button } from "@mui/material";
import { useState } from "react";

const SecondChanceButton = ({ onClick, children, ...rest }) => {
  const [confirmed, setConfimed] = useState(false);
  return (
    <Button
      onClick={() => {
        if (confirmed) {
          onClick();
          setConfimed(false);
        } else {
          setConfimed(true);
        }
      }}
      {...rest}
    >
      {confirmed ? "Confirm" : children}
    </Button>
  );
};

export const AcceptButton = (props) => {
  const handleSubmit = () => {
    const newIncomingRequests = props.requests.filter((req) => {
      return (
        req.products_transactions_id != props.request.products_transactions_id
      );
    });
    console.log(newIncomingRequests);
    // console.log(evt);
    console.log("from inside of handle Submit");
    axios
      .post(
        `http://localhost:8001/api/requests/${props.request.products_transactions_id}/activate`
      )
      .then((res) => props.setIncomingRequests(newIncomingRequests))
      .catch((err) => {
        console.log(err.message);
      });
  };
  return (
    <>
      <SecondChanceButton
        onClick={handleSubmit}
        variant="contained"
        color="success"
      >
        ACCEPT
      </SecondChanceButton>
    </>
  );
};

export const RejectButton = (props) => {
  const handleSubmit = () => {
    const newIncomingRequests = props.requests.filter((req) => {
      return (
        req.products_transactions_id != props.request.products_transactions_id
      );
    });
    console.log(newIncomingRequests);
    // console.log(evt);
    console.log("from inside of handle Submit");
    axios
      .post(
        `http://localhost:8001/api/requests/${props.request.products_transactions_id}/delete`
      )
      .then((res) => props.setIncomingRequests(newIncomingRequests))
      .catch((err) => {
        console.log(err.message);
      });
  };
  return (
    <>
      <SecondChanceButton color="error" onClick={handleSubmit}>
        REJECT
      </SecondChanceButton>
    </>
  );
};

export const CancelButton = (props) => {
  const handleSubmit = () => {
    const newIncomingRequests = props.requests.filter((req) => {
      return (
        req.products_transactions_id != props.request.products_transactions_id
      );
    });
    console.log(newIncomingRequests);
    // console.log(evt);
    console.log("from inside of handle Submit");
    axios
      .post(
        `http://localhost:8001/api/requests/${props.request.products_transactions_id}/delete`
      )
      .then((res) => props.setIncomingRequests(newIncomingRequests))
      .catch((err) => {
        console.log(err.message);
      });
  };
  return (
    <>
      <SecondChanceButton onClick={handleSubmit}>CANCEL</SecondChanceButton>
    </>
  );
};
