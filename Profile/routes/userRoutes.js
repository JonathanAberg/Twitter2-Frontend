const express = require('express');
const { registerUser, loginUser, getUsers } = require('../controllers/userController');

const router = express.Router();

router.post('/', registerUser);

router.post('/', loginUser);

router.get('/', getUsers);

module.exports = router;