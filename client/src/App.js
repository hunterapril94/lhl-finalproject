import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import Products from "./components/Products";

function App() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    Promise.all([axios.get("http://localhost:8001/api/products")])
      .then((all) => {
        // console.log(res.data.products);
        setProducts(all[0].data.products);
      })
      .catch((err) => console.log(err.message));
  }, []);
  return (
    <div className="App">
      <Products products={products} />
      {/* <h1>Hello!</h1>

      <h1>{state}</h1> */}
    </div>
  );
}

export default App;
