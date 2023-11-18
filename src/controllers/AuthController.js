// controllers/AuthController.js
const userService = require("../services/userService")
const jwt = require("jsonwebtoken");
const UserModel = require("../model/User");
const authenticateToken = require("../middleware/authenticate");
const { access } = require("fs");
// Use the environment variable as the secret key
const secretKey = process.env.JWT_SECRET_KEY || "mySecretKey";

const generateToken = (user_id) => {
  return jwt.sign({ user_id }, secretKey, { expiresIn: "1h" });
};

const login = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            message: 'Missing inputs parameter!'
        })
    }

    let userData = await userService.handleUserLogin(email, password)
    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMessage,
        user: userData.user ? userData.user : {}
    })
};

  

const register = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Check if the email already exists
    const existingUser = await UserModel.getUserByEmailAndPassword(email, password);
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }
    // Create a new user
    const user_id = await UserModel.createUser(email, password);
    // Generate a token for the new user
    const token = generateToken(user_id);

    // Set the token as a cookie
    res.cookie("jwt", token, { httpOnly: true });

    res.json({ message: 'Registration successful', token });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

module.exports = { login, register, generateToken };
