import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = (props) => {
  console.log("in log out route");
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .post("http://localhost:8001/api/users/logout")
      .then((res) => {
        console.log(res.data);
        props.auth(false);
      })
      .then(() => {
        setTimeout(() => {
          navigate("/");
        }, 5000);
      });
  }, []);
  return <div>See you soon!!!</div>;
};

export default Logout;
