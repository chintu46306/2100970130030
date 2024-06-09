import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, FormControl, InputLabel, Select, MenuItem, Grid, Card, CardContent, CardMedia } from '@mui/material';

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
        <Container sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Top Products
        </Typography>
        <Grid container spacing={2} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Sort By</InputLabel>
              <Select value={sort} onChange={(e) => setSort(e.target.value)}>
                <MenuItem value="price">Price</MenuItem>
                <MenuItem value="rating">Rating</MenuItem>
                <MenuItem value="discount">Discount</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Order</InputLabel>
              <Select value={order} onChange={(e) => setOrder(e.target.value)}>
                <MenuItem value="asc">Ascending</MenuItem>
                <MenuItem value="desc">Descending</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container spacing={4}>
          {products.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={product.imageUrl}
                  alt={product.productName}
                />
                <CardContent>
                  <Typography variant="h6" component="div">
                    {product.productName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Price: ${product.price}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Rating: {product.rating}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Discount: {product.discount}%
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Availability: {product.availability}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    );
};

export default ProductList;
