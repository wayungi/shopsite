const express =  require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');


const productDB = {
    products: require('../model/product.json'),
    setProducts: function(data) {
        this.products = data
    }
}

router.get('/', (req, res) => {
    res.status(200).json({"products": productDB.products})
})

router.post('/', (req, res) => {
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
})

router.get('/search/:search', (req, res) => {
    const searchTerm =  req.params.search;
    if(!searchTerm) return res.status(400).json({"message": "Please type what to serach for"})
    const searchResult = productDB.products.filter((product) => product.name.toLocaleLowerCase().includes(searchTerm.toLowerCase()));
    if(searchResult.length){
        res.status(200).json({searchResult})
    }else{
        res.status(200).json({"message": "No match found"})
    }
})

router.get('/category/:category', (req, res) => {
    const category =  req.params.category;
    if(!category) return res.status(400).json({"message": "Please type category"})
    const searchResult = productDB.products.filter((product) => product.category.toLowerCase().includes(category.toLowerCase()));
    if(searchResult.length){
        res.status(200).json({searchResult})
    }else{
        res.status(200).json({"message": "No match found"})
    }
});

module.exports = router;
