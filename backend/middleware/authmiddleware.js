const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET

exports.verifyToken = (req,res,next)=>{
    const authHeader = req.header("Authorization")
    if (!authHeader || !authHeader.startsWith("Bearer")) {
        return res.status(401).json({message:'Invalid no or token'})
    }
    const token = authHeader.split(" ")[1]
    try {
        req.user = jwt.verify(token,JWT_SECRET)
        next()
    } catch (error) {
        console.error('Invalid NO OR TOKEN',error)
        res.status(403).json({message:'Invalid no or token'})
    }
}
exports.requireRole = (role)=>(req,res,next)=>{
 try {
    if(req.user === req.user.role){
        return next()
    }
    res.json(403).json({message:'Invalid no or ROLE'})
 } catch (error) {
    console.error('Invalid NO OR ROLE',error)
        res.status(403).json({message:'Invalid no or ROLE'})
 }
}