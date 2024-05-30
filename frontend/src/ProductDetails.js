import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

const ProductDetails = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/categories/Laptop/products/${productId}`);
                setProduct(response.data);
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        };
        fetchProductDetails();
    }, [productId]);

    return (
        <Container>
            {product ? (
                <>
                    <Typography variant="h4">{product.productName}</Typography>
                    <Typography>Price: ${product.price}</Typography>
                    <Typography>Rating: {product.rating}</Typography>
                    <Typography>Discount: {product.discount}%</Typography>
                    <Typography>Availability: {product.availability}</Typography>
                </>
            ) : (
                <Typography>Loading...</Typography>
            )}
        </Container>
    );
};

export default ProductDetails;
