const redis= require('redis');
const redisClient= redis.createClient();


redisClient.on("connect",()=>{
    console.log('connection to redis...')
})
redisClient.on("ready",()=>{
    console.log("connected to redis")
})

redisClient.on("error",()=>{
    console.log("failed to connect redis")
})

module.exports={
    redisClient
}