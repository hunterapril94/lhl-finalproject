import { TextareaAutosize } from "@mui/material";
import React, { useEffect } from "react";
import useState from "react";
import axios from "axios";
import AvatarWithColor from "../AvatarWithColor/AvatarWithColor";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  TableFooter,
  Box,
  TextField,
  Button,
} from "@mui/material";
import theme from "../../components/styles";

const MessageList = (props) => {
  const [messages, setMessages] = useState([]);
  const [formText, setFormText] = useState("");
  const [messageDisplay, setMessageDisplay] = useState("none");

  const send = function (event, transactionId, firstName) {
    // event.preventDefault();
    // const time = Date.now();
    // const data = new FormData(event.currentTarget);
    // const text = data.get("text");
    // setMessages((prev) => {
    //   return [...prev, { first_name: firstName, text }];
    // });
    // console.log(transactionId, text);
    // axios.post(`http://localhost:8001/api/requests/messages`, {
    //   product_transaction_id: transactionId,
    //   text: text,
    // });
    // // console.log(messages)
    // document.getElementById("text").value = "";
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8001/api/requests/messages/${props.id}`)
      .then((res) => {
        console.log(res.data);
        setMessages(res.data.messages);
        // for (const message of res.data.messages) {
        //   console.log(message.first_name);
        //   if (
        //     !message.is_read &&
        //     message.first_name !== appState.profile.first_name
        //   ) {
        //     console.log("posting");
        //     axios
        //       .post(
        //         `http://localhost:8001/api/requests/messages/${message.id}/is-read`
        //       )
        //       .then((res) => {
        //         console.log("success");
        //       })
        //       .catch((err) => {
        //         console.log(err);
        //       });
        //   }
        // }
      }, []);
  });

  return (
    <></>
    // <TableContainer
    //   sx={{ position: "fixed", bottom: "0", right: "0", width: "300px" }}
    // >
    //   <Table sx={{ width: "300px" }}>
    //     <TableHead
    //       sx={{ backgroundColor: theme.palette.primary.main, color: "white" }}
    //       onClick={() => {
    //         setMessageDisplay("none");
    //       }}
    //     >
    //       <TableRow>
    //         <TableCell sx={{ color: "white" }}>Messages</TableCell>
    //       </TableRow>
    //     </TableHead>
    //     <TableBody
    //       sx={{
    //         display: messageDisplay,
    //         backgroundColor: "white",
    //         width: "300px",
    //         height: "300px",
    //         overflowX: "hidden",
    //         overflowY: "auto",
    //       }}
    //     >
    //       {messages.map((message, index) => {
    //         return (
    //           <TableRow key={index}>
    //             <TableCell sx={{ display: "flex" }}>
    //               <AvatarWithColor firstName={message.first_name} />
    //               <Typography sx={{ margin: "10px" }}>
    //                 {message.text}
    //               </Typography>
    //             </TableCell>
    //           </TableRow>
    //         );
    //       })}
    //     </TableBody>
    //     <TableFooter
    //       sx={{
    //         display: messageDisplay,
    //         backgroundColor: "white",
    //         width: "300px",
    //       }}
    //     >
    //       <TableRow>
    //         <TableCell>
    //           <Box
    //             component="form"
    //             onSubmit={(event) => {
    //               //  send(event, transactionId, appState.profile.first_name);
    //             }}
    //           >
    //             <TextField
    //               name="text"
    //               onChange={setFormText}
    //               value={formText}
    //             />
    //             <Button
    //               variant="contained"
    //               sx={{ marginTop: "10px" }}
    //               type="submit"
    //             >
    //               Send
    //             </Button>
    //           </Box>
    //         </TableCell>
    //       </TableRow>
    //     </TableFooter>
    //   </Table>
    // </TableContainer>
  );
};

export default MessageList;
