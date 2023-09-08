const { UserModel } = require("../models/Users.model")
const bcrypt= require('bcrypt');
const { jwtToken, verifyRefreshToken, setOnRedis } = require("../utills/jwt.helpers");
const getUsers=async(req,res)=>{
        try {
            const data= await UserModel.find({});
            return res.status(200).json({data})
        } catch (error) {
           return res.status(500).send({ msg: "Internal Server Error", code: "22" });
            
        }
}

const postUsers=(req,res)=>{
    let {name,email,mobile,password}= req.body;
    try {
        bcrypt.hash(password, 5, async (err, hash) => {
            if (hash) {
              password = hash;
              const data = new UserModel({name,email,mobile,password});
              const isSaved = await data.save();
            return  res.status(200).send({ msg: "Registration Successfull !", });
            } else {
             return res.status(500).send({ msg: "Internal Server Error", code: "22" });
            }
          });
    } catch (error) {
        
    }
}

const deleteUsers=async(req,res)=>{
        const {userId}= req.params

        try {
           const data= await UserModel.findByIdAndDelete({_id:userId})
           return res.status(200).json({msg:"User Deleted"})
        } catch (error) {
            return res.status(500).send({ msg: "Internal Server Error", code: "38" });
        }
}

const editUsers=async(req,res)=>{
    const {userId}= req.params;
    let {name,email,mobile,password}= req.body
    const payload={};
    if(name){
        payload.name=name
    }
    if(email){
        payload.email=email
    }
    if(mobile){
        payload.mobile=mobile
    }
    try {
        if(password){
            bcrypt.hash(password, 5, async (err, hash) => {
                if (hash) {
                  password = hash;
                }
            });
            payload.password= password
        }
        const data = await UserModel.findByIdAndUpdate({_id:userId},payload)
        return  res.status(200).send({ msg: "Details updated !" });
    } catch (error) {
        return res.status(500).send({ msg: "Internal Server Error", code: "22" });
    }
}

const loginUsers=async(req,res)=>{
    const {email,password}= req.body;
    try {
        const data = await UserModel.findOne({ email });
        if (!data) {
          res
            .status(200)
            .send({ msg: "You don't have an account Please Register yourself" });
        } else {
          bcrypt.compare(password, data.password, async (err, stat) => {
            if (stat) {
               const token= await jwtToken(data._id,{expiresIn:'1h'})
              const refreshToken= await jwtToken(data._id,{expiresIn:'1d'})
             setOnRedis(data._id,6000,refreshToken);
              res.status(200).send({
                msg: "Login Successfull",
                token,refreshToken
              });
             }else{
                res.status(206).send({ msg: "Invalid Credentials" });
             }
         });
      }
     } catch (error) {
        res.status(500).send({ msg: "Internal Server Error", code: 93 });
      }
}
const refreshJwtToken=async(req,res)=>{
  let refreshToken = req.headers.authorization;
  refreshToken= refreshToken.split(" ")[1];
    try {
        const isVerified= await verifyRefreshToken(refreshToken);
        if(isVerified){
            const token= await jwtToken(isVerified.userId,{expiresIn:"1h"});
            refreshToken= await jwtToken(isVerified.userId,{expiresIn:'1d'})
            setOnRedis(refreshToken);
            return res.status(200).json({token,refreshToken})
        }else{
            return res.status(206).json({msg:"Refresh Token Expired !"})
        }
    } catch (error) {
        res.status(500).send({ msg: "Internal Server Error", code: 110 });
    }
}
module.exports={
    getUsers,postUsers,deleteUsers,editUsers,loginUsers,refreshJwtToken
}