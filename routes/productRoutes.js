const express =  require('express');
const router = express.Router();
const verifyJWT =  require('../middleware/verifyJWT') // for authorization
const verifyRoles =  require('../middleware/verifyRoles');
const ROLES_LIST = require('../config/roles_list');

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
    .get(getAllProducts) // this route is accesible to all loggedin and not loggedin users
    .post(verifyJWT, verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), addProduct) //  only admin & editor
    .put(verifyJWT, verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), updateProduct)//  only admin & editor
    .delete(verifyJWT, verifyRoles(ROLES_LIST.Admin), deleteProduct); //  only admin

router.get('/search/:search', searchByName);
router.get('/category/:category', searchByCategory);

module.exports = router;
