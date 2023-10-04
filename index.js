const express = require('express');
const app =  express();
const PORT = process.env.PORT || 3000

const productDB = {
    products: require('./model/product.json'),
    setProducts: function(data) {
        this.products = data
    }
}

app.get('/', (req, res) => {
    res.json({"products": productDB.products})
})

app.listen( PORT, console.log(`server is listening on port ${PORT}`))



