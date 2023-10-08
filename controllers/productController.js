const { v4: uuidv4 } = require('uuid');
const Product =  require('../model/product');
// route handlers

const productDB = {
    products: require('../model/product.json'),
    setProducts: function(data) {
        this.products = data
    }
}

const getAllProducts = async (req, res) => {
    const result = await Product.find();
    if(!result) res.sendStatus(500); // internal server error
    res.status(200).json({"products": result})
}

const addProduct = async (req, res) => {
    const { name, image, price, category, stock } = req. body
    if(!name || !image || !price || !stock) return res.status(400).json({"error": "all fields are required"}); // bad request
    const newProduct = { name, image, price, category, stock }
    const result =  await Product.create(newProduct);
    if(!result) res.status(500).json({"message": "could not save product"});
    res.status(201).json({newProduct}) // created
}

const searchByName = async(req, res) => {
    const searchTerm =  req.params.search;
    console.log(searchTerm)
    if(!searchTerm) return res.status(400).json({"message": "Please type what to serach for"}) //Bad request
    const searchResult = await Product.find({ name: new RegExp(searchTerm, 'i') }).exec();
    if(!searchResult) return res.sendStatus(500);
    res.status(200).json({searchResult})

}

const searchByCategory = async (req, res) => {
    const category =  req.params.category;
    if(!category) return res.status(400).json({"message": "Please type category"})// bad request
    const searchResult = await Product.find({ category: new RegExp(category, 'i') }).exec();
    if(!searchResult) return res.sendStatus(500);
    res.status(200).json({searchResult});
}

const updateProduct = async (req, res) => {
    const id = req.body._id;
    const productToUpdate =  await Product.findOne({_id: id})
    if(!productToUpdate) return res.status(400).json({"message": "product not found"}) //bad request

    // Once we have the priduct to update, go ahead and update each field it it exists
    if(req.body.name) productToUpdate.name = req.body.name
    if(req.body.image) productToUpdate.image = req.body.image
    if(req.body.price) productToUpdate.price = req.body.price
    if(req.body.category) productToUpdate.category = req.body.category
    if(req.body.stock) productToUpdate.stcok =  req.body.stock

    //remove the old product instance from memory
    // const filteredProducts =  productDB.products.filter((product) => product.id === productToUpdate.id);
    //add the updated product
    // const updatedProductList= [...filteredProducts, productToUpdate];
    // console.log(updatedProductList);
    // productDB.setProducts(updatedProductList);
    const result =  await productToUpdate.save();
    if(!result) return res.sendStatus(500)
    res.status(200).json(product);
};

const deleteProduct = (req, res) => {
    const productToDelete =  productDB.products.find((product) => product.id === req.body.id);
    if(!productToDelete) return res.status(400).json({"message": "product not found"})
    const filteredProducts = productDB.products.filter((product) => product.id !== req.body.id)
    productDB.setProducts(filteredProducts)
    res.status(200).json(productToDelete);
};

module.exports = {
    getAllProducts,
    addProduct,
    searchByName,
    searchByCategory,
    updateProduct,
    deleteProduct
}