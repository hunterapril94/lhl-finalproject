import axios from "axios";
import { useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

const Logout = () => {
  const [appState, setAppState] = useOutletContext();
  const navigate = useNavigate();
  useEffect(() => {
    axios.post("http://localhost:8001/api/users/logout").then((res) => {
      console.log(res.data);
      setAppState((prev)=>{
        console.log(prev)
        return {...prev, auth: false}
      });
    });
  }, []);
  return <div>See you soon!!!</div>;
};

export default Logout;
