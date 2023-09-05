const productModel = require('../models/productModel');

exports.getHomePage = (req, res) => {
    const products = productModel.getAllProducts();
    res.render('home', { products });
};

exports.getAllProducts = (req, res) => {
    const productsJSONString = productModel.getProductsJSON();
    res.send(`These are all the products in /products: ${productsJSONString}`);
};

exports.getProductDetails = (req, res, next) => {
    const productID = parseInt(req.params.id);
    const product = productModel.getProductByID(productID);

    if (product) {
        res.render('productDetails', { product, imagePath: `/images/${product.image}` });
    } else {
        const error = new Error('Product not found');
        error.statusCode = 404;
        next(error);
    }
};

exports.searchProducts = (req, res) => {
    const { q, minPrice, maxPrice } = req.query;
    const filteredProducts = productModel.searchProducts(q, minPrice, maxPrice);
    res.json(filteredProducts);
};

exports.createProduct = (req, res) => {
    const newProduct = req.body;
    const product = productModel.createProduct(newProduct);
    res.status(201).json(product);
};

exports.updateProduct = (req, res, next) => {
    const productId = parseInt(req.params.id);
    const updatedProduct = req.body;
    const product = productModel.updateProduct(productId, updatedProduct);

    if (product) {
        res.json(product);
    } else {
        const error = new Error('Product not found');
        error.statusCode = 404;
        next(error);
    }
};

exports.deleteProduct = (req, res, next) => {
    const deleteProduct = parseInt(req.params.id);
    const result = productModel.deleteProduct(deleteProduct);

    if (result) {
        res.json(result);
    } else {
        const error = new Error('Product not found');
        error.statusCode = 404;
        next(error);
    }
};
