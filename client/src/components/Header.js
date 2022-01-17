import { Fragment } from "react";

export const Header = () => {
  return (
    <>
      <ul className="nav">
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/about">About</a>
        </li>
        <li>
          <a href="/users/:id">profile</a>
        </li>
      </ul>
    </>
  );
};
