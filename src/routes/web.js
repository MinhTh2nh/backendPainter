// routes/web.js
const express = require("express");
const router = express.Router();
const db = require("../config/database");

const {
    getHomePage,
    getABC,
    createUser,
    getUser
} = require('../controllers/homeController')

/**
 * @swagger
 * tags:
 *   name: user
 *   description: Operations related to users
 */

/**
 * @swagger
 * /:
 *   get:
 *     summary: Get data.
 *     tags: [user]
 *     responses:
 *       200:
 *         description: Data retrieved successfully.
 */
router.get('/', function (req, res) {
    return res.status(200).json({ message: 'Data retrieved successfully' });
});

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve a list of users.
 *     description: Retrieve a list of users from the database.
 *     tags: [user]
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   user_id:
 *                     type: integer
 *                     description: The user ID.
 *                     example: 0
 *                   email:
 *                     type: string
 *                     description: The user's email.
 *                     example: minhthanh123@gmail.com
 */

router.get('/users', (req, res) => {
    // Your existing code here
});

/**
 * @swagger
 * /users/{user_id}:
 *   get:
 *     summary: Retrieve a user by ID.
 *     parameters:
 *       - in: path
 *         name: user_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The user ID.
 *     tags: [user]
 *     responses:
 *       200:
 *         description: A single user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user_id:
 *                   type: integer
 *                   description: The user ID.
 *                   example: 0
 *                 email:
 *                   type: string
 *                   description: The user's email.
 *                   example: minhthanh123@gmail.com
 */

router.get('/users/:user_id', (req, res) => {
    // Your existing code here
});

/**
 * @swagger
 * /users/{user_id}:
 *   put:
 *     summary: Update a user by ID.
 *     parameters:
 *       - in: path
 *         name: user_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The user ID.
 *     requestBody:
 *       description: Updated user data.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email.
 *                 example: updated_email@gmail.com
 *     tags: [user]
 *     responses:
 *       200:
 *         description: User updated successfully.
 */

router.put('/users/:user_id', (req, res) => {
    // Your existing code here
});

/**
 * @swagger
 * /users/{user_id}:
 *   delete:
 *     summary: Delete a user by ID.
 *     parameters:
 *       - in: path
 *         name: user_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The user ID.
 *     tags: [user]
 *     responses:
 *       200:
 *         description: User deleted successfully.
 */

router.delete('/users/:user_id', (req, res) => {
    // Your existing code here
});

/**
 * @swagger
 * /create-user:
 *   post:
 *     summary: Create a new user.
 *     requestBody:
 *       description: User data to create.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email.
 *                 example: minhthanh123@gmail.com
 *     tags: [user]
 *     responses:
 *       201:
 *         description: User created successfully.
 */

router.post('/create-user', createUser);

module.exports = router;
