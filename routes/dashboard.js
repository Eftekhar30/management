const express=  require('express')
const router = express.Router()

const verifyToken = require('../middleware/authMiddleware')

router.get('/data', verifyToken, (req,res)=>{
    res.status(200).json({
        message: "Welcome",
        userId: req.user.id,
        role: req.user.role,
        secretData: "Uni files"
    })
})

module.exports = router