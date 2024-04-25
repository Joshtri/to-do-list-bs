const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');


router.get('/login', loginController.loginPage);




module.exports = router;