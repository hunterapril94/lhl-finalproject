import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [state, setState] = useState("");
  useEffect(() => {
    axios.get("http://localhost:8001/home").then((res) => {
      console.log(res);
      setState(res.data.message);
    }).catch((err)=> console.log(err.message));
  }, []);
  return (
    <div className="App">
      <h1>Hello!</h1>

      <h1>{state}</h1>
    </div>
  );
}

export default App;
