const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const ejs = require('ejs');
const path = require('path');

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));

const port = process.env.PORT || 3000;

const productController = require('./controllers/productController');
const errorHandler = require('./controllers/errorController');

app.use((req, res, next) => {
    const currentTime = new Date();
    console.log(`[${currentTime.toISOString()}] ${req.method} ${req.url}`);
    next();
});

app.use(errorHandler);

app.get('/', productController.getHomePage);
app.get('/products', productController.getAllProducts);
app.get('/products/:id', productController.getProductDetails);
app.get('/products/search', productController.searchProducts);

app.post('/products', productController.createProduct);
app.put('/products/:id', productController.updateProduct);
app.delete('/products/:id', productController.deleteProduct);

app.listen(port, () => {
    console.log(`Server is listening on ${port}`);
});
