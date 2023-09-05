const express = require('express');
const productController = require('../controllers/productController');
const router = express.Router();

router.get('/', (req, res) => {
    res.send(`These are all the products in /products: ${productsJSONString}`);
});

router.post('/', productController.product_index);

router.get('/:id', productController.product_details);

router.get('/search', (req, res) => {
    const { q, minPrice, maxPrice } = req.query;

    let filteredProducts = products;

    if (q) {
        filteredProducts = filteredProducts.filter((product) =>
            product.name.toLowerCase().includes(q.toLowerCase())
        );
    }

    if (minPrice) {
        filteredProducts = filteredProducts.filter((product) =>
            product.price >= parseFloat(minPrice)
        );
    }

    if (maxPrice) {
        filteredProducts = filteredProducts.filter((product) =>
            product.price <= parseFloat(maxPrice)
        );
    }

    res.json(filteredProducts);
});



router.put('/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const updatedProduct = req.body;
    const index = products.findIndex((p) => p.id === productId);

    if (index !== -1) {
        products[index] = { ...products[index], ...updatedProduct };
        res.json(products[index]);
    } else {
        const error = new Error('Product not found');
        error.statusCode = 404;
        next(error);
    }
});

router.delete('/:id', (req, res) => {
    const deleteProduct = parseInt(req.params.id);
    const index = products.findIndex((p) => p.id === deleteProduct);

    if (index !== -1) {
        products.splice(index, 1);
        res.json(products);
    } else {
        const error = new Error('Product not found');
        error.statusCode = 404;
        next(error);
    }
});

module.exports = router;
