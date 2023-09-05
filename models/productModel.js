let products = [
    { id: 1, name: 'iPhone 12 Pro', price: 1099.99, image: 'image1.jpg' },
    { id: 2, name: 'SamsungGalaxyS21', price: 999.99, image: 'image2.jpg' },
    { id: 3, name: 'Sony PlayStation 5', price: 499.99, image: 'image3.jpg' },
    { id: 4, name: 'MacBook Pro 16', price: 2399.99, image: 'image4.jpg' },
    { id: 5, name: 'DJI Mavic Air 2', price: 799.99, image: 'image5.jpg' },
];

exports.getAllProducts = () => products;

exports.getProductsJSON = () => JSON.stringify(products);

exports.getProductByID = (id) => products.find((product) => product.id === id);

exports.searchProducts = (q, minPrice, maxPrice) => {
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

    return filteredProducts;
};

exports.createProduct = (newProduct) => {
    newProduct.id = products.length + 1;
    products.push(newProduct);
    return newProduct;
};

exports.updateProduct = (productId, updatedProduct) => {
    const index = products.findIndex((p) => p.id === productId);
    if (index !== -1) {
        products[index] = { ...products[index], ...updatedProduct };
        return products[index];
    } else {
        return null;
    }
};

exports.deleteProduct = (productId) => {
    const index = products.findIndex((p) => p.id === productId);
    if (index !== -1) {
        products.splice(index, 1);
        return products;
    } else {
        return null;
    }
};
