import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./component/Footer";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import Navbar from "./component/Navbar";
import { CartProvider } from "./component/CartContext"; // ✅ Use the Provider, not the context
import CardPage from "./component/CardPage";
import OrdersPage from "./component/OrdersPage";
import Menu from "./screens/Menu";

function App() {
  return (
    <CartProvider>
      {" "}
      {/* ✅ Wrap app with context provider */}
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/cart" element={<CardPage />} />
          <Route path="/orders" element={<OrdersPage />} />
        </Routes>
        <Footer />
      </Router>
    </CartProvider>
  );
}

export default App;
