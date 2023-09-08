const express= require('express');
const cors= require('cors');
const { UserRouter } = require('../routes/Users.route');
const { PostRouter } = require('../routes/Post.route');
const { connection } = require('../connections/db.connection');
require('dotenv').config();
require('../utills/redis.js')
const app=express();
const port= process.env.PORT||8080;
app.use(cors());
app.use(express.json());

app.use("/users",UserRouter);
app.use("/posts",PostRouter);



app.listen(port,()=>{
    console.log('serveris running on',port )
    connection();
})