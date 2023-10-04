const express =  require('express');
const router = express.Router();
const {getAllProducts, addProduct, searchByName, searchByCategory} = require('../controllers/productController');


// routes
router.get('/', getAllProducts);

router.post('/', addProduct)

router.get('/search/:search', searchByName)

router.get('/category/:category', searchByCategory);

module.exports = router;
