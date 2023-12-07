// routes/web.js
const express = require("express");
const router = express.Router();
const db = require("../config/database");


/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve a list of users.
 *     description: Retrieve a list of users from the database.
 *     tags: [User]
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
    let users = [];
    db.query("SELECT * FROM user", (err, results) => {
        if (err) {
            return res.status(500).json({
                error: "Database error"
            });
        }
        users = results;
        // console.log(">>>>>check users= ", users);
        res.send(JSON.stringify(users))
        // return res.status(200).json(results);
    });
})

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
 *     tags: [User]
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
    const { user_id } = req.params; // Extracting user_id from the request parameters
    let users = [];
    
    db.query(`SELECT * FROM user WHERE user_id = ${user_id}`, (err, results) => {
        if (err) {
            return res.status(500).json({
                error: "Database error"
            });
        }
        users = results;
        res.send(JSON.stringify(users));
    });
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
 *     tags: [User]
 *     responses:
 *       200:
 *         description: User updated successfully.
 */

router.put('/users/:user_id', (req, res) => {
    const { user_id } = req.params; // Extracting user_id from the request parameters
    const updatedUserData = req.body; // Assuming the updated user data is sent in the request body

    db.query(
        `UPDATE user SET ? WHERE user_id = ${user_id}`,
        updatedUserData,
        (err, results) => {
            if (err) {
                return res.status(500).json({
                    error: "Database error"
                });
            }
            res.json({ message: "User updated successfully" });
        }
    );
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
 *     tags: [User]
 *     responses:
 *       200:
 *         description: User deleted successfully.
 */

router.delete('/users/:user_id', (req, res) => {
    const { user_id } = req.params; 
    // Extracting user_id from the request parameters

    db.query(`DELETE FROM user WHERE user_id = ${user_id}`, (err, results) => {
        if (err) {
            return res.status(500).json({
                error: "Database error"
            });
        }
        res.json({ message: "User deleted successfully" });
    });
});
/**
 * @swagger
 * /users/getUserIDByEmail:
 *   post:
 *     summary: Get user ID by email.
 *     requestBody:
 *       description: User email.
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
 *     tags: [User]
 *     responses:
 *       200:
 *         description: User ID retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userID:
 *                   type: integer
 *                   description: The user ID.
 *                   example: 0
 *       404:
 *         description: User not found.
 */
router.post('/users/getUserIDByEmail', async (req, res) => {
    const { email } = req.body;

    db.query('SELECT user_id FROM user WHERE email = ?', [email], (error, results) => {
        if (error) {
            console.error('Error fetching user ID:', error);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }

        if (results.length > 0) {
            res.json({ userID: results[0].user_id });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    });
});

module.exports = router; 