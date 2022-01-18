import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import Products from "./components/Products";
import { ThemeProvider } from '@mui/material';
import theme from "./components/styles";


function App() {
  const [products, setProducts] = useState([]);
  useEffect(() => { Promise.all([
    axios.get("http://localhost:8001/api/products")]).then((all) => {
      // console.log(res.data.products);
      setProducts(all[0].data.products);
    }).catch((err)=> console.log(err.message))
  }, []);
  return (
    <ThemeProvider theme={theme}>    
      <div className="App" >
      <Products products={products} key={1} />
      </div>
    </ThemeProvider>

  );
}

export default App;
