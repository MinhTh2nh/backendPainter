// middleware/authenticate.js
const jwt = require('jsonwebtoken');
// Use the environment variable as the secret key
const secretKey = process.env.JWT_SECRET_KEY || 'mySecretKey';

const authenticateToken = (req, res, next) => {
    console.log('Cookies: ',req.cookies)
    // Client-side logging
    const token1 = "actual_token_here";
    console.log('Sending Token:', token1);

    // Server-side logging
    const token = req.headers.authorization.split(" ")[1];
    console.log('Received Token:', token);

    if (!token) {
        return res.sendStatus(401); 
    }
    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            console.error('Token verification failed:', err);
            return res.sendStatus(403);
        }
        req.user = user;
        next();
    });
};

module.exports = authenticateToken;