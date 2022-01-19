import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

function UserDetail() {
  const { id } = useParams;
  const [user, setUser] = useState({});
  useEffect(() => {
    axios.get(`http://localhost:8001/api/users/info`).then((user) => {
      setUser(user);
    });
  }, []);
  return (
    <>
      <h2>This is the profile page!</h2>
      <ul>
        <li>
          <Link to="/profile/view">view</Link>
        </li>
        <li>
          <Link to="/profile/edit">edit</Link>
        </li>
        <li>
          <Link to="/profile/pending-requests">pending requests</Link>
        </li>
        <li>
          <Link to="/profile/myproducts">my products</Link>
        </li>
        <li>
          <Link to="/profile/myproducts/:id">product detail</Link>
        </li>
        <li>
          <Link to="/profile/myproducts/:id/edit">product edit</Link>
        </li>
      </ul>
      <p> {user.name}</p>
      <p>{user.email}</p>
    </>
  );
}
export default UserDetail;
