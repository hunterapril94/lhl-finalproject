import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Header } from "./components/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Products from "./components/Products";
import About from "./pages/About";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Users from "./pages/Users";
import UserProfile from "./pages/UserProfile";
import OwnUserProfile from "./pages/OwnUserProfile";
import Product from "./components/Product";

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
        <Products products={products} />
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="products" element={<Products />}>
          <Route path=":id" element={<Product />} />
        </Route>

        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="users" element={<Users />}>
          <Route path="me" element={<OwnUserProfile />} />
          <Route path=":id" element={<UserProfile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
