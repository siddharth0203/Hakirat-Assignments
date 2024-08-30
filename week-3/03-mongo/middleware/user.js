// Middleware for handling auth
const {User} = require('../db');
async function userMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    const Username = req.headers.Username;
    const Password = req.headers.Password;
    try {
        await User.findOne({
            Username : Username,
            Password : Password
        });
    } catch (error) {
        res.json("User does'nt exists");
    }
    next();
}

module.exports = userMiddleware;