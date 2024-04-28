const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');


router.get('/', loginController.loginPage);
router.post('/create_new_account', loginController.createAccount);

router.post('/post_login', loginController.loginUser)

module.exports = router;