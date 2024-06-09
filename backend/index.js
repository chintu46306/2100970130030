const express = require('express');

const axios = require('axios');

const app = express();

const PORT = process.env.PORT ||  5000;

// Cache to store product datas
let productCache = {};

// Helper function to fetch products from test API
const fetchProducts = async (company, category, minPrice, maxPrice, top) => {
    const url = `http://20.244.56.144/test/companies/${company}/categories/${category}/products?top=${top}&minPrice=${minPrice}&maxPrice=${maxPrice}`;
    const response = await axios.get(url,{
        headers: {
            Authorization: `Bearer qRyJyAmaLXAoFiYE`
        }
    });
    return response.data;
};

// Endpoint to get top N products
app.get('/categories/:category/products', async (req, res) => {
    const { category } = req.params;
    const { n, page = 1, minPrice = 0, maxPrice = Infinity, sort = 'price', order = 'asc' } = req.query;

    if (n > 10) {
        return res.status(400).json({ error: 'n exceeds maximum limit of 10' });
    }

    try {
        let products = [];

        const companies = ['AMZ', 'FLP', 'SNP', 'MYN', 'AZO'];
        for (let company of companies) {
            const companyProducts = await fetchProducts(company, category, minPrice, maxPrice, n);
            products = products.concat(companyProducts);
        }

        // Sort products
        products.sort((a, b) => {
            if (order === 'asc') {
                return a[sort] - b[sort];
            } else {
                return b[sort] - a[sort];
            }
        });

        // Paginate products
        const paginatedProducts = products.slice((page - 1) * n, page * n);

        res.json(paginatedProducts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Endpoint to get product details
app.get('/categories/:category/products/:productid', async (req, res) => {
    const { category, productid } = req.params;

    // Assuming we store the product details in the cache
    const product = productCache[productid];

    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ error: 'Product not found' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
