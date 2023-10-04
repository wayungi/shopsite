const express =  require('express');
const router = express.Router();
const { 
    getAllProducts,
    addProduct,
    searchByName,
    searchByCategory,
    updateProduct,
    deleteProduct
} = require('../controllers/productController');


// routes
router.route('/')
    .get(getAllProducts)
    .post(addProduct)
    .put(updateProduct)
    .delete(deleteProduct);

router.get('/search/:search', searchByName);
router.get('/category/:category', searchByCategory);


module.exports = router;
