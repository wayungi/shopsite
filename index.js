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
    res.json({"products": productDB.products})
})

app.post('/', (req, res) => {
    const { name, image, price } = req. body
    if(!name || !image || !price) return res.json({"error": "all fields are required"});
    const newProduct = {
        id: uuidv4(),
        name,
        image,
        price
    }
  
    productDB.setProducts([...productDB.products, newProduct])
    console.log(productDB.products)
    res.json({newProduct})
})

app.listen( PORT, console.log(`server is listening on port ${PORT}`))



