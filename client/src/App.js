import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [state, setState] = useState("");
  useEffect(() => {
    axios.get("http://localhost:8080/home").then((res) => {
      console.log("from inside of axios call");
      setState("Hello");
    });
  }, []);
  return (
    <div className="App">
      <h1>Hello!</h1>

      <h1>{state}</h1>
      {/* {useEffect(() => {
      axios.get("http://localhost:8080/"),
      .then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);} */}
    </div>
  );
}

export default App;
