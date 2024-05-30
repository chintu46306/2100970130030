import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductList from './src/ProductList';
import ProductDetails from './src/ProductDetails';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<ProductList />} />
                <Route path="/categories/:category/products/:productId" element={<ProductDetails />} />
            </Routes>
        </Router>
    );
};

export default App;
