import { useState } from "react";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = (event) => {
    event.preventDefault();
    console.log("from inside of submit handler");
    console.log(email, password);

    axios
      .post(`http://localhost:8001/api/users/login`, {
        email: email,
        password: password,
      })
      .then((res) => {
        console.log(res);
        console.log(res.data);
      });
  };
  return (
    <form autoComplete="off" onSubmit={submitHandler}>
      <input
        className=""
        name="email"
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <input
        className=""
        name="password"
        type="text"
        placeholder="Enter password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <button>Submit</button>
    </form>
  );
}

export default Login;
