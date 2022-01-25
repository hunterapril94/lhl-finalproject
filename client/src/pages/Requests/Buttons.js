import axios from "axios";
import { Button, Box, Badge } from "@mui/material";
import { useState } from "react";
import { useOutletContext } from "react-router";
import MailIcon from "@mui/icons-material/Mail";
import theme from "../../components/styles";

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
  const [appState, setAppState] = useOutletContext();
  const handleSubmit = () => {
    const newIncomingRequests = props.requests.filter((req) => {
      return (
        req.products_transactions_id != props.request.products_transactions_id
      );
    });

    // console.log(evt);

    axios
      .post(
        `http://localhost:8001/api/requests/incomming/${props.request.products_transactions_id}/activate`
      )
      .then((res) => {
        props.setIncomingRequests(newIncomingRequests);
        setAppState((prev) => {
          return {
            ...prev,
            auth: res.data.auth,
            profile: res.data.userProfile,
          };
        });
      })
      .catch((err) => {});
  };
  return (
    <>
      {/* <Box sx={{ m: 1 }}> */}
      <SecondChanceButton
        sx={{ m: 0.5 }}
        size="small"
        onClick={handleSubmit}
        variant="contained"
        color="success"
      >
        ACCEPT
      </SecondChanceButton>
      {/* </Box> */}
    </>
  );
};

export const RejectButton = (props) => {
  const [appState, setAppState] = useOutletContext();
  const handleSubmit = () => {
    const newIncomingRequests = props.requests.filter((req) => {
      return (
        req.products_transactions_id != props.request.products_transactions_id
      );
    });
    //console.log(newIncomingRequests);
    // console.log(evt);

    axios
      .post(
        `http://localhost:8001/api/requests/incomming/${props.request.products_transactions_id}/reject`
      )
      .then((res) => {
        props.setIncomingRequests(newIncomingRequests);
        setAppState((prev) => {
          //does not need to updatebalance
          return {
            ...prev,
            auth: res.data.auth,
          };
        });
      })
      .catch((err) => {});
  };
  return (
    <>
      <SecondChanceButton
        sx={{ m: 0.5 }}
        size="small"
        color="error"
        variant="outlined"
        onClick={handleSubmit}
      >
        REJECT
      </SecondChanceButton>
    </>
  );
};

export const CancelButton = (props) => {
  const [appState, setAppState] = useOutletContext();
  const handleSubmit = () => {
    const newIncomingRequests = props.requests.filter((req) => {
      return (
        req.products_transactions_id != props.request.products_transactions_id
      );
    });

    // console.log(evt);

    axios
      .post(
        `http://localhost:8001/api/requests/outgoing/${props.request.products_transactions_id}/cancel`
      )
      .then((res) => {
        props.setIncomingRequests(newIncomingRequests);
        setAppState((prev) => {
          return {
            ...prev,
            auth: res.data.auth,
            profile: res.data.userProfile,
            snackBar: {
              isShown: res.data.isShown,
              severity: res.data.severity,
              message: res.data.message,
            },
          };
        });
      })
      .catch((err) => {
        // console.log(err.message);
      });
  };
  return (
    <>
      <SecondChanceButton color="error" onClick={handleSubmit}>
        CANCEL
      </SecondChanceButton>
    </>
  );
};

// export const returnButton = (event, id) => {
//   event.PreventDefault();

// };

export const ReturnButton = (props) => {
  const [appState, setAppState] = useOutletContext();
  const handleSubmit = () => {
    const newBorrowedItems = props.items.filter((item) => {
      return item.name != props.item.name;
    });

    // console.log(evt);

    axios
      .post(
        `http://localhost:8001/api/requests/active/${props.item.products_transactions_id}/returned`
      )
      .then((res) => {
        props.setProducts(newBorrowedItems);
        setAppState((prev) => {
          return {
            ...prev,
            auth: res.data.auth,
            profile: res.data.userProfile,
            snackBar: {
              isShown: res.data.isShown,
              severity: res.data.severity,
              message: res.data.message,
            },
          };
        });
      })
      .catch((err) => {
        // console.log(err.message);
      });
  };
  return (
    <>
      <SecondChanceButton onClick={handleSubmit}>
        MARK AS RETURNED
      </SecondChanceButton>
    </>
  );
};

export const MessageButton = function (props) {
  return (
    <Button
      // variant="contained"
      size="small"
      color="secondary"
      onClick={(event) => {
        props.handleSubmit(event);
      }}
    >
      <Badge badgeContent={props.unread} color="secondary">
        <MailIcon />
      </Badge>
    </Button>
  );
};
