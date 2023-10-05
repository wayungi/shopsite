const express =  require('express');
const router = express.Router();
const { registerUser } = require('../controllers/registerContoller');
const { login } = require('../controllers/authController');
// check the export vs the import alternative here
const refreshTokenController = require('../controllers/refreshTokenCOntroller')

router.post('/register',registerUser);
router.post('/auth', login);
router.get('/refresh', refreshTokenController.handleRefreshToken);

module.exports = router;
