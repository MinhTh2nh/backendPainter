// controllers/AuthController.js
const db = require("../config/database");
const UsersModel = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validateRegisterInput = require("../validator/RegisterValidator");
require("dotenv").config();

const login = async (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    // Replace 'users' with your actual table name
    const sql = `SELECT * FROM user WHERE email = ?`;

    db.query(sql, [email], async (err, result) => {
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
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        // Make payload for token
        const payload = {
          user_id: user.user_id,
          email: user.email,
          role: user.role,
        };

        // Sign token
        jwt.sign(
          payload,
          process.env.JWT_SECRET_KEY,
          {
            expiresIn: 3155,
          },
          (err, token) => {
            res.json({
              status: "success",
              token: token,
            });
          }
        );
      } else {
        return res.status(401).json({
          status: "failed",
          error: "Password incorrect",
        });
      }
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      status: "failed",
      error: "Internal Server Error",
    });
  }
};

const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validation Register
    const validationErrors = validateRegisterInput({ email, password }).errors;
    const isValid = validateRegisterInput({ email, password }).isValid;

    // if invalid / doesn't pass validation
    if (!isValid) {
      return res.status(validationErrors.status).json(validationErrors);
    }

    // Check if the email already exists
    const checkEmailQuery = 'SELECT * FROM user WHERE email = ?';
    db.query(checkEmailQuery, [email], async (err, result) => {
      if (err) {
        return res.status(500).json({
          status: "failed",
          error: "Internal Server Error",
        });
      }

      if (result.length > 0) {
        return res.status(401).json({
          status: "error",
          error: `Email "${email}" already exists!`,
        });
      }

      // Hash the user's password before storing it
      const hashedPassword = await bcrypt.hash(password, 10);

      // If email doesn't exist, insert the new user
      const insertUserQuery = 'INSERT INTO user SET ?';
      db.query(insertUserQuery, { email, password: hashedPassword, role: "user" }, (err, result) => {
        if (err) {
          return res.status(400).json(err);
        }
        res.json({
          status: "success",
          message: "Successfully created account!",
          data: result,
        });
      });
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({
      status: "failed",
      error: "Internal Server Error",
    });
  }
};

module.exports = {
  login,
  register
};