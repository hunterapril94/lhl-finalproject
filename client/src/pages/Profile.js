import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

function UserDetail() {
  const { id } = useParams;
  const [user, setUser] = useState({});
  useEffect(() => {
    axios.get(`http://localhost:8001/api/users/${id}`).then((user) => {
      setUser(user);
    });
  }, []);
  return (
    <>
      <h2>This is the profile page!</h2>
      <p> {user.name}</p>
      <p>{user.email}</p>
      <Link to="/user/:id/products">My products</Link>
      <Link to="/user/:id/requests">My products</Link>
    </>
  );
}
export default UserDetail;
