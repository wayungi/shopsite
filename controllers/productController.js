const { v4: uuidv4 } = require('uuid');

// route handlers

const productDB = {
    products: require('../model/product.json'),
    setProducts: function(data) {
        this.products = data
    }
}

const getAllProducts = (req, res) => {
    res.status(200).json({"products": productDB.products})
}

const addProduct = (req, res) => {
    const { name, image, price, category } = req. body
    if(!name || !image || !price) return res.status(400).json({"error": "all fields are required"}); // bad request
    const newProduct = {
        id: uuidv4(),
        name,
        image,
        price,
        category
    }
    productDB.setProducts([...productDB.products, newProduct])
    res.status(201).json({newProduct}) // created
}

const searchByName = (req, res) => {
    const searchTerm =  req.params.search;
    if(!searchTerm) return res.status(400).json({"message": "Please type what to serach for"})
    const searchResult = productDB.products.filter((product) => product.name.toLocaleLowerCase().includes(searchTerm.toLowerCase()));
    if(searchResult.length){
        res.status(200).json({searchResult})
    }else{
        res.status(200).json({"message": "No match found"})
    }
}

const searchByCategory = (req, res) => {
    const category =  req.params.category;
    if(!category) return res.status(400).json({"message": "Please type category"})
    const searchResult = productDB.products.filter((product) => product.category.toLowerCase().includes(category.toLowerCase()));
    if(searchResult.length){
        res.status(200).json({searchResult})
    }else{
        res.status(200).json({"message": "No match found"})
    }
}

const updateProduct = (req, res) => {
    const productToUpdate =  productDB.products.find((product) => product.id === req.body.id);
    if(!productToUpdate) return res.status(400).json({"message": "product not found"}) //bad request
    if(req.body.name) productToUpdate.name = req.body.name
    if(req.body.image) productToUpdate.image = req.body.image
    if(req.body.price) productToUpdate.price = req.body.price
    if(req.body.category) productToUpdate.category = req.body.category
    //remove the old product instance from memory
    const filteredProducts =  productDB.products.filter((product) => product.id === productToUpdate.id);
    //add the updated product
    const updatedProductList= [...filteredProducts, productToUpdate];
    console.log(updatedProductList);
    productDB.setProducts(updatedProductList);
    res.status(200).json(productToUpdate);
};

const deleteProduct = (req, res) => {

};

module.exports = {
    getAllProducts,
    addProduct,
    searchByName,
    searchByCategory,
    updateProduct,
    deleteProduct
}