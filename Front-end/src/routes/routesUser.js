import React from 'react';
import { Routes, Route } from 'react-router-dom';
// Import các trang
import Login from '../pages/login';
import Contact from '../pages/Contact';
import Signup from '../pages/Signup';
import HomePage from '../pages/HomePage';
import CategoryProduct from "../pages/CategoryProducts";
import CategoryGrid from "../components/CategoryGrid";
import ProductDetail from '../pages/ProductDetail';
import CartProduct from '../pages/CartProduct';
const RoutesUser = () => {
    return (
        <Routes>
            {/* Trang chính */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/register" element={<Signup />} />
            <Route path="/category/:category" element={<CategoryProduct />} />
            <Route path="/" element={<CategoryGrid />} />
            <Route path="/ProductDetail" element={<ProductDetail />} />
            <Route path="/cart" element={<CartProduct />} />
        </Routes>
    );
};

export default RoutesUser;
