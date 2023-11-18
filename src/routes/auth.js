const AuthController = require('../controllers/AuthController');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const UserModel = require('../model/User');
const authenticateToken = require('../middleware/authenticate');


router.post('/login', AuthController.login);
// New registration route
router.post('/register', AuthController.register); 
// Get user information route// Use the environment variable as the secret key
const secretKey = process.env.JWT_SECRET_KEY || 'mySecretKey';
router.get('/user', authenticateToken, (req, res) => {
  // Logic to get user information based on the token using the model
  const userInformation = {
    user_id: req.user.user_id,
    user_email: req.user.email,
    user_role: req.user.role,
  };
  // Set CORS headers
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Credentials', true);
  // Send the user information as JSON
  res.json(userInformation);
});

module.exports = router;