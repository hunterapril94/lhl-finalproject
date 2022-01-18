import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Logout = (props) => {
  const navigate = useNavigate();
  useEffect(() => {
    axios.post("http://localhost:8001/api/users/logout").then((res) => {
      console.log(res.data);
      props.auth(false);
      navigate("/");
    });
  }, []);
  return <div></div>;
};
