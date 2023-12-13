require('dotenv').config();
const jwt = require('jsonwebtoken');


exports.verify = async(req,res,next)=>{
   const token = req.cookies.token;
   if(!token){
    return res.status(400).json({
        message: 'user is not authenticated.'
    })
   }
   try {
    const decoded = jwt.verify(token , process.env.JWT_SECRET);
    req.userInfo = decoded;
    console.log('passed');
    next();

   } catch (error) {
     console.error(error);
    return res.status(401).json({
    message: 'Invalid token. User authentication failed.',
  });
   }
}