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
 *                 $ref: '#/components/schemas/user'
 *   post:
 *     summary: Create a new user
 *     tags: [users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/user'
 *     responses:
 *       200:
 *         description: The created user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/user'
 *       500:
 *         description: Some server error
 * /users/{id}:
 *   get:
 *     summary: Get the user by id
 *     tags: [users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *     responses:
 *       200:
 *         description: The user response by id
 *         contents:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/user'
 *       404:
 *         description: The user was not found
 *   put:
 *    summary: Update the user by the id
 *    tags: [users]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The user id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/user'
 *    responses:
 *      200:
 *        description: The user was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/user'
 *      404:
 *        description: The user was not found
 *      500:
 *        description: Some error happened
 *   delete:
 *     summary: Remove the user by id
 *     tags: [users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *
 *     responses:
 *       200:
 *         description: The user was deleted
 *       404:
 *         description: The user was not found
 */
const {
    getHomePage,
    getABC,
    createUser,
    getUser
} = require('../controllers/homeController')
// router.get( '/' , getHomePage )
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
router.delete('/users/:user_id', (req, res) => {
    const { user_id } = req.params; // Extracting user_id from the request parameters

    db.query(`DELETE FROM user WHERE user_id = ${user_id}`, (err, results) => {
        if (err) {
            return res.status(500).json({
                error: "Database error"
            });
        }
        res.json({ message: "User deleted successfully" });
    });
});

router.post( '/create-user' , createUser )

router.get('/abc' , getABC )
router.get('/', function (req, res) {
    return res.status(200).json(results);
});


module.exports = router; 