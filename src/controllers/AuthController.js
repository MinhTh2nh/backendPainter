// controllers/AuthController.js
const db = require("../config/database");
const UsersModel = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validateRegisterInput = require("../validator/RegisterValidator");
require("dotenv").config();

const login = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  // Replace 'users' with your actual table name
  const sql = `SELECT * FROM user WHERE email = ?`;
  db.query(sql, [email, password], (err, result) => {
    if (err) {
      return res.status(500).json({
        status: "failed",
        error: "Internal Server Error",
      });
    }
    // Check if user exists
    if (result.length === 0) {
      return res.status(404).json({
        status: "failed",
        error: "User not found",
      });
    }
    const user = result[0];
    // Validate password
    if (password === user.password) {
      // Make payload for token
      const payload = {
        user_id: user.user_id,
        email: user.email,
        role: user.role,
      };
      // Sign token
      jwt.sign(
        payload,
        process.env.JWT_SECRET_KEY, {
          expiresIn: 3155
        },
        (err, token) => {
          res.json({
            status: "success",
            token: token,
          });
        }
      );
    } else {
      return res.status(404).json({
        status: "failed",
        error: "Password incorrect",
      });
    }
  });
};

const register = async (req, res, next) => {
  let obj = {
    email: req.body.email,
    password: req.body.password,
    role: "user",
  };

  // Validation Register
  const errors = validateRegisterInput(obj).errors;
  const isValid = validateRegisterInput(obj).isValid;

  // if invalid / doesn't pass validation
  if (!isValid) {
    return res.status(errors.status).json(errors);
  }

  // Check if the email already exists
  const checkEmailQuery = 'SELECT * FROM user WHERE email = ?';
  db.query(checkEmailQuery, [obj.email], (err, result) => {
    if (err) {
      return res.status(500).json({
        status: "failed",
        error: "Internal Server Error",
      });
    }

    if (result.length > 0) {
      return res.status(401).json({
        status: "error",
        error: `Email "${obj.email}" already exists!`,
      });
    }

    // If email doesn't exist, insert the new user
    const insertUserQuery = 'INSERT INTO user SET ?';
    db.query(insertUserQuery, obj, (err, result) => {
      if (err) {
        return res.status(400).json(err);
      }

      res.json({
        status: "success",
        message: "Successfully create account!",
        data: result,
      });
    });
  });
};


module.exports = {
  login,
  register
};