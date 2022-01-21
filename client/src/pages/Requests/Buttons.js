import axios from "axios";
import { TableCell } from "@mui/material";
import { Button } from "@mui/material";

export const AcceptButton = (props) => {
  const handleSubmit = (evt) => {
    evt.preventDefault();
    const newIncomingRequests = props.requests.filter((req) => {
      return (
        req.products_transactions_id != props.request.products_transactions_id
      );
    });
    console.log(newIncomingRequests);
    console.log(evt);
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
    <TableCell align="center">
      <Button type="submit" onClick={handleSubmit}>
        ACCEPT
      </Button>
      <Button>REJECT</Button>
    </TableCell>
  );
};

export const Buttons = () => {
  return <div></div>;
};
