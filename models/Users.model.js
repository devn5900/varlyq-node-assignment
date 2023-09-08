const mongoose= require('mongoose');


const UserSchema= mongoose.Schema({
    name:{required:true,type:String},
     email:{required:true,unique:true,type:String},
      mobile:{required:true,type:String}, 
    password:{required:true,type:String} 
},{
    versionKey:false
})


const UserModel= mongoose.model("Users",UserSchema);


module.exports={
    UserSchema,UserModel
}