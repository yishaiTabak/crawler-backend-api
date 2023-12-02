const {createClient} = require("redis");

const redisSubscriber = createClient({

    socket:{
        host: process.env.REDIS_HOST,
        port:process.env.REDIS_PORT,
    }
    
})

redisSubscriber.on('error', err => console.log('Redis Client Error', err));
redisSubscriber.connect().then(()=>{console.log("redis connected");})

module.exports = redisSubscriber