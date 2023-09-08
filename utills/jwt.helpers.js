const jwt= require('jsonwebtoken');
const { redisClient } = require('./redis');

const jwtToken=async(userId,config={})=>{
    try {
        const token= jwt.sign({ userId},"devn5900",config)
    return token;
    } catch (error) {
        return false;
    }
}

const verifyRefreshToken=async(refreshToken)=>{
    try {
       const status= jwt.verify(refreshToken, "devn5900");
       return status;
    } catch (error) {
        return false
    }
}

const setOnRedis=async(userId,refreshToken,expiresIn)=>{
    try {
        redisClient.setEx(userId, expiresIn,refreshToken.toString());
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

module.exports={
    jwtToken,verifyRefreshToken,setOnRedis
}