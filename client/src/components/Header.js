import { Link } from "react-router-dom";

export const Header = () => {
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
          <Link to="/users/:id">profile</Link>
        </li>
      </ul>
    </>
  );
};
