const express = require('express');
const router = express.Router();

// controller
const Users = require('../controllers/Users');

router.get('/:id', Users.get);

module.exports = router;
