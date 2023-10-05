const express =  require('express');
const router = express.Router();
const { registerUser } = require('../controllers/registerContoller');
const { login } = require('../controllers/authController');

router.post('/register',registerUser);
router.post('/auth', login);

module.exports = router;
