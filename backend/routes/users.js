// routes/users.js

const express = require('express');
const router = express.Router();
const { registerUser, getAllUsers, loginUser } = require('../controllers/users');

// Define routes related to users
router.post('/register', registerUser);
router.post('/login', loginUser); // Add login route

router.get('/', getAllUsers);


module.exports = router;

