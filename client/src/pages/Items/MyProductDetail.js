import { useParams } from "react-router";
//STRETCH
const MyProductDetail = () => {
  const { id } = useParams();
  return (
    <div>
      <h1>My product details</h1>
      <h2>Id: {id}</h2>
    </div>
  );
};

export default MyProductDetail;
