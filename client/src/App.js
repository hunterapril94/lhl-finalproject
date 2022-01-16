import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [state, setState] = useState("");
  useEffect(() => {
    axios.get("http://localhost:8080/home").then((res) => {
      console.log(res);
      setState(res.data.message);
    });
  }, []);
  return (
    <div className="App">
      <h1>Hello!</h1>

      <h1>{state}</h1>
    </div>
  );
}

export default App;
