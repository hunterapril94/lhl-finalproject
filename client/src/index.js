import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import ProductsAll from "./pages/ProductsAll";
import MyProductEdit from "./pages/MyProductEdit";
import Logout from "./pages/Logout";
import About from "./pages/About";
import ProductDetail from "./pages/ProductDetail";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import SignUp from "./pages/SignUp";
import MyTransactions from "./pages/MyTransactions";
import LentItems from "./pages/LentItems";
import BorrowedItems from "./pages/BorrowedItems";
import MyRequests from "./pages/MyRequests";
import RequestProduct from "./pages/RequestProduct"

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<ProductsAll />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/logout" element={<Logout />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>

        <Route path="/my-product-edit" element={<MyProductEdit />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/my-lent-items" element={<LentItems />}></Route>
        <Route
          path="/my-completed-transactions"
          element={<MyTransactions />}
        ></Route>
        <Route path="/my-borrowed" element={<BorrowedItems />}></Route>
        <Route path="/my-requests" element={<MyRequests />}></Route>
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/products/:id/request" element={<RequestProduct />} />
      </Route>
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);

//reportWebVitals();

// export const navMenuItems = [
//   { id: 0, icon: "", label: "Products", route: "/" },
//   { id: 1, icon: "", label: "login", route: "login" },
//   { id: 2, icon: "", label: "logout", route: "logout" },
//   { id: 3, icon: "", label: "my-product-edit", route: "my-product-edit" },
//   { id: 4, icon: "", label: "about", route: "about" },
//   { id: 5, icon: "", label: "Profile", route: "profile" },
//   { id: 6, icon: "", label: "sign-up", route: "signup" },
//   { id: 7, icon: "", label: "Completed Treansactions", route: "my-completed-transactions" },
//   { id: 8, icon: "", label: "My Lent Items", route: "my-lent-items" }
//   { id: 9, icon: "", label: "My Borrowed Items", route: "my-borrowed" }
//   { id: 10, icon: "", label: "", route: "my-requests" },
// ];
