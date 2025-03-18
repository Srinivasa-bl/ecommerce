import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavigationBar from "./components/Navbar"; // Ensure correct path

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Auth from "./pages/Auth";  // Updated to single Auth component
import SellerLogin from "./pages/SellerLogin";

function App() {
    return (
        <Router>
            <NavigationBar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/products" element={<Products />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/auth" element={<Auth />} />  {/*  Combined Signin & Signup */}
                <Route path="/seller-login" element={<SellerLogin />} />
            </Routes>
        </Router>
    );
}

export default App;
