import axios from "axios";
import { Button, Box } from "@mui/material";
import { useState } from "react";
import { useOutletContext } from "react-router";

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
        sx={{ m: 1 }}
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
          };
        });
      })
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
          };
        });
      })
      .catch((err) => {
        console.log(err.message);
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
