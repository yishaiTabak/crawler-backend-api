const WebSocket = require('ws')
const redisSubscriber = require('./db/redis');

const addToSqs = require('./sqs');
const server = require('./app');
const wss = new WebSocket.Server({ server });

const PORT = process.env.PORT

wss.on('connection', (ws) => {
    console.log('Client connected');

  //   const keepAliveInterval = setInterval(() => {
  //     if (ws.readyState === WebSocket.OPEN) {
  //         ws.send(JSON.stringify("keepAlive"));
  //     }
  // }, 30000);
  
  ws.on('message', (message)=>{
    onMessage(message, ws)
  })
  })

  const onMessage = (message, ws) =>{
    const messageToSend = composeMessage(message)
    handleMessage(messageToSend)

    const channel = messageToSend;
    const listener = (message, channel) => {
      const crawledData = JSON.parse(message);
      console.log(crawledData);
      if(crawledData === "finished"){
        console.log('Client disconnected');
        redisSubscriber.unsubscribe(channel);
      }
        ws.send(JSON.stringify(crawledData));
    };
    redisSubscriber.subscribe(channel, listener);

    ws.on('close', () => {
      console.log('Client disconnected');
      // redisSubscriber.unsubscribe(channel);
      // clearInterval(interval);
      });
  }

  async function handleMessage(message){
    await addToSqs(message)
  };

  const composeMessage = (message)=>{
    const messageString = message.toString()
    const objData = JSON.parse(messageString)
    objData.searchId = new Date().getTime()
    return JSON.stringify(objData)
  }

  server.listen(PORT, ()=>{
    console.log("server connected, port: ",PORT);
})