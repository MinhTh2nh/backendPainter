const db = require('../config/database')

const getUser = (req, res) => {
    db.query("SELECT * FROM user", (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Database error" });
        }
        console.log(">>>>>results = ", results);
        return res.status(200).json(results);
    });
}


const createUser = (req, res) => {
    console.log('Received a POST request to /create-user with data:', req.body);
    // Validate inputs
    const { email, password, role } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: 'Email, and password are required' });
    }
    // Check if the email already exists
    db.query('SELECT * FROM user WHERE email = ?', [email], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        if (results.length > 0) {
            return res.status(400).json({ error: 'Email already in use' });
        }
        // Insert the new user
        db.query('INSERT INTO user (email, password, role) VALUES (?, ?, ?)', [email, password, role], (err, data) => {
            if (err) {
                return res.status(500).json({ error: 'Database error' });
            }
            // After successful insertion, redirect to retrieve all user data
            db.query('SELECT * FROM user', (err, results) => {
                if (err) {
                    return res.status(500).json({ error: 'Database error' });
                }
                return res.status(201).json({ message: 'User registration successful', users: results });
            });
        });
    });
}

module.exports = {
    createUser,
    getUser
};