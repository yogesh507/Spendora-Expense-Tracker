 const jwt = require("jsonwebtoken");
 const redisClient = require("../config/redis");
const User = require("../Models/users");

const auth = async(req,res,next)=>{
try{

const {token} = req.cookies;

if(!token){
throw new Error("Please login first")
}

// // verify token
// const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);

 
// check blocked token
// const isBlocked = await redisClient.exists(`token:${token}`);
// if(isBlocked) throw new Error("Invalid Token");

// verify token
const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);

// check user exist
const user = await User.findById(decoded._id);
if(!user) throw new Error("User not found");

// user info attach
req.user = user;

next();

}catch(err){
res.status(401).send("Unauthorized: " + err.message)
}
}

module.exports = auth;