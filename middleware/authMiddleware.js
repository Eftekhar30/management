const jwt = require('jsonwebtoken');
require('dotenv').config(); // Ensure it can read your local .env

const verifyToken = (req, res, next) => {
    const authHeader = req.header('Authorization');

    if (!authHeader) {
        return res.status(401).json({ message: "Access Denied: No token provided" });
    }

    try {
        // The frontend sends "Bearer [token_string]". We split by space and grab the 2nd part.
        const actualToken = authHeader.split(" ")[1];

        // Use the Render/Local Environment Variable, or fallback to your hardcoded one
        const secret = process.env.JWT_SECRET || "my_super_secret_key";
        
        const verified = jwt.verify(actualToken, secret);

        req.user = verified;
        next();
    } catch (error) {
        console.error("JWT Verification Error:", error.message);
        res.status(400).json({ message: "invalid or expired token" });
    }
};

module.exports = verifyToken;