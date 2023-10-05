const express =  require('express');
const router = express.Router();
const verifyJWT =  require('../middleware/verifyJWT')

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
    .post(verifyJWT, addProduct)
    .put(verifyJWT, updateProduct)
    .delete(verifyJWT,deleteProduct);

router.get('/search/:search', searchByName);
router.get('/category/:category', searchByCategory);


module.exports = router;
