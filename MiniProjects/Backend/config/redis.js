
const redis=require("redis")

const redisClient=redis.createClient({
     username: 'default',
    password:  process.env.REDIS_PASSWORD,
    socket: {
        host: 'redis-14571.crce292.ap-south-1-2.ec2.cloud.redislabs.com',
        port: 14571
    }
}); 

 
module.exports=redisClient;