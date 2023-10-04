const express = require('express');
const app =  express();
const PORT = process.env.PORT || 3000
const { v4: uuidv4 } = require('uuid');

const productDB = {
    products: require('./model/product.json'),
    setProducts: function(data) {
        this.products = data
    }
}


//middleware
app.use(express.json())
// app.use(express.urlencoded())

app.get('/', (req, res) => {
    res.status(200).json({"products": productDB.products})
})

app.post('/', (req, res) => {
    const { name, image, price } = req. body
    if(!name || !image || !price) return res.status(400).json({"error": "all fields are required"}); // bad request
    const newProduct = {
        id: uuidv4(),
        name,
        image,
        price
    }
    productDB.setProducts([...productDB.products, newProduct])
    res.status(201).json({newProduct}) // created
})

app.get('/search/:search', (req, res) => {
    const searchTerm =  req.params.search;
    if(!searchTerm) return res.status(400).json({"message": "Please type what to serach for"})
    const searchResult = productDB.products.filter((product) => product.name.toLocaleLowerCase().includes(searchTerm.toLowerCase()));
    if(searchResult.length){
        res.status(200).json({searchResult})
    }else{
        res.status(200).json({"message": "No match found"})
    }
})

app.listen( PORT, console.log(`server is listening on port ${PORT}`))



