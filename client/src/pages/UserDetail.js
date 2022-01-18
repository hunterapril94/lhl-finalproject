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
      <p> {user.name}</p>
      <p>{user.email}</p>
      <Link to="/users/:id/products">My products</Link>
      <Link to="/users/:id/requests">My products</Link>
    </>
  );
}
export default UserDetail;
