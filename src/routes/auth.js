const AuthController = require('../controllers/AuthController');
const express = require("express");
const router = express.Router();
/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: Operations related to authentication.
 */

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Authenticate user.
 *     requestBody:
 *       description: User credentials for authentication.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username for authentication.
 *                 example: john_doe
 *               password:
 *                 type: string
 *                 format: password
 *                 description: The password for authentication.
 *                 example: securePassword123
 *     tags: [Authentication]
 *     responses:
 *       200:
 *         description: Authentication successful.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT token for authenticated user.
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMjM0NTY3ODkwLCJpYXQiOjE1MTYyMzkwMjJ9.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
 *       401:
 *         description: Unauthorized. Invalid credentials.
 */

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user.
 *     requestBody:
 *       description: User details for registration.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username for registration.
 *                 example: john_doe
 *               password:
 *                 type: string
 *                 format: password
 *                 description: The password for registration.
 *                 example: securePassword123
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email address for registration.
 *                 example: john@example.com
 *     tags: [Authentication]
 *     responses:
 *       201:
 *         description: User registered successfully.
 *       400:
 *         description: Bad Request. Registration failed.
 */

router.post("/login", AuthController.login);
router.post("/register", AuthController.register);

module.exports = router;