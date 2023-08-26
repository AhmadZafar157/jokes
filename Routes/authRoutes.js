// routes/authRoutes.js

const express = require('express');
const router = express.Router();
const authController = require('../app/Controllers/authController');
console.log("came to authRoutes!");
router.post('/login', authController.login);
router.put('/signup', authController.signup);

module.exports = router;
