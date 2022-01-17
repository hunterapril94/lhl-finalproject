import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Header } from "./components/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Products from "./components/Products";
import About from "./pages/About";
import Login from "./pages/Login";
import Users from "./pages/Users";
import OwnUserProfile from "./pages/OwnUserProfile";
import ProductDetail from "./pages/ProductDetail";

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
    <BrowserRouter>
      <div className="App">
        <Header />
      </div>
      <Routes>
        <Route path="/" element={<Products products={products} exact />} />
        <Route path="/products" element={<Products products={products} />}>
          <Route path="/products/:id" element={<ProductDetail />} />
        </Route>

        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/users" element={<Users />}>
          <Route path="/users/:id" element={<OwnUserProfile />}>
            <Route path="/users/:id/products" />
            <Route path="/users/:id/requests" />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
