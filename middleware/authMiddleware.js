const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    const token = req.header('Authorization')

    if(!token){
        return res.status(400).json({message: "Access Denied"})
    }


    try{
        const verified = jwt.verify(actualToken, "my_super_secret_key")

        req.user = verified
        next()
    } catch(error){
        res.status(400).json({message: "invalid or expired token"})
    }
}

module.exports= verifyToken