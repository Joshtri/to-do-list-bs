const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController')


//url path.
router.get('/', UserController.UserPage);



module.exports = router;