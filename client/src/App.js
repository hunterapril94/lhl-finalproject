import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Header } from "./components/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router";

import Products from "./components/Products";
import { ThemeProvider } from "@mui/material";
import theme from "./components/styles";

import About from "./pages/About";
import Login from "./pages/Login";
import UserDetail from "./pages/Profile";
import ProductDetail from "./pages/ProductDetail";
import NotFound from "./pages/NotFound";
import { useNavigate } from "react-router";

function App() {
  const [products, setProducts] = useState([]);
  const [login, setLogin] = useState(false);

  useEffect(() => {
    Promise.all([axios.get("http://localhost:8001/api/products")])
      .then((all) => {
        // console.log(res.data.products);
        setProducts(all[0].data.products);
        console.log(all[0].data);
      })
      .catch((err) => console.log(err.message));
  }, []);
  return (
    <BrowserRouter>
      <div className="App">
        <Header auth={login} />
        {/* <button onClick={() => useNavigate("/login")}>
          {login ? "Log out" : "Login"}
        </button> */}

        <Routes>
          <Route path="/" element={<Products products={products} />} />
          <Route path="/products" element={<Products products={products} />} />
          <Route path="/products/:id" element={<ProductDetail />} />

          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login auth={setLogin} />} />
          <Route path="/logout" element={<Login auth={setLogin} />} />
          <Route
            path="/user"
            element={login ? <UserDetail /> : <Navigate to="/" />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
