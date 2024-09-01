// Middleware for handling auth
const jwt = require("jsonwebtoken");
const {secret} = require("../jwtsecret");
async function userMiddleware(req, res, next) {
    const token = req.headers.authorization;
    const words = token.split(" ");
    const jwtToken = words[1];
    try {
        const decodedValue = jwt.verify(jwtToken, secret);
        if (decodedValue) {
            next();
        } else {
            res.status(403).json({
                msg: "You are not authenticated"
            })
        }
    } catch(e) {
        res.json({
            msg: "Incorrect inputs"
        })
    }
}

module.exports = userMiddleware;