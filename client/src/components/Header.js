import { Link } from "react-router-dom";

export const Header = (props) => {
  return (
    <>
      <ul className="nav">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/user">profile</Link>
        </li>
      </ul>

      {props.auth ? (
        <Link to="/logout">Logout</Link>
      ) : (
        <Link to="/login">Login</Link>
      )}
      {/* <button onClick={() => setLogin(!login)}>
        {login ? "Log out" : "Login"}
      </button> */}
    </>
  );
};
