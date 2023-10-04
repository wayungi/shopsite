const express =  require('express');
const router = express.Router();
const {getAllProducts, addProduct, searchByName, searchByCategory} = require('../controllers/productController');


// routes
router.route('/')
    .get(getAllProducts)
    .post(addProduct);
router.get('/search/:search', searchByName);
router.get('/category/:category', searchByCategory);

module.exports = router;
