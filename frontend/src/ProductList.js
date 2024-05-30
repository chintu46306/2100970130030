import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Grid, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState('Laptop');
    const [sort, setSort] = useState('price');
    const [order, setOrder] = useState('asc');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/categories/${category}/products`, {
                    params: { n: 10, sort, order }
                });
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProducts();
    }, [category, sort, order]);

    return (
        <Container>
            <Typography variant="h4" component="h1" gutterBottom>
                Top Products
            </Typography>
            <FormControl>
                <InputLabel>Sort By</InputLabel>
                <Select value={sort} onChange={(e) => setSort(e.target.value)}>
                    <MenuItem value="price">Price</MenuItem>
                    <MenuItem value="rating">Rating</MenuItem>
                    <MenuItem value="discount">Discount</MenuItem>
                </Select>
            </FormControl>
            <FormControl>
                <InputLabel>Order</InputLabel>
                <Select value={order} onChange={(e) => setOrder(e.target.value)}>
                    <MenuItem value="asc">Ascending</MenuItem>
                    <MenuItem value="desc">Descending</MenuItem>
                </Select>
            </FormControl>
            <Grid container spacing={4}>
                {products.map((product) => (
                    <Grid item key={product.id} xs={12} sm={6} md={4}>
                        <Typography variant="h6">{product.productName}</Typography>
                        <Typography>Price: ${product.price}</Typography>
                        <Typography>Rating: {product.rating}</Typography>
                        <Typography>Discount: {product.discount}%</Typography>
                        <Typography>Availability: {product.availability}</Typography>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default ProductList;
