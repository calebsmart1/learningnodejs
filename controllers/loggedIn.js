const db = require("../routes/db-config");
const jwt = require("jsonwebtoken");

const loggedIn = async (req, res, next) => { // Added 'next' here
    if (!req.cookies.userRegistered) return next();
    
    try {
        const decoded = jwt.verify(req.cookies.userRegistered, process.env.JWT_SECRET);
        db.query('SELECT * FROM users WHERE id = ?', [decoded.id], (err, result) => {
            if (err || !result.length) return next(); // Handle errors or empty result
            req.user = result[0]; // Attach the user data to the request object
            return next(); // Proceed to the next middleware or route handler
        });
    } catch (err) {
        return next(); // Handle JWT verification errors
    }
};

module.exports = loggedIn;
