const {Router}= require("express");
const { getUsers, postUsers, deleteUsers, editUsers, loginUsers, refreshJwtToken } = require("../controllers/User.controller");


 const UserRouter= Router();

UserRouter.get("/",getUsers);
UserRouter.post("/",postUsers);
UserRouter.delete("/:userId",deleteUsers);
UserRouter.put("/:userId",editUsers)
UserRouter.post("/login",loginUsers)
UserRouter.get("/refreshtoken",refreshJwtToken)
module.exports={
    UserRouter
 }