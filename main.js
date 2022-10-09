import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:8080",
        methods: ["GET", "POST"]
      }
});

io.on("connection", (socket) => {
  console.log("ON CONNECTION")
});

httpServer.listen(3000);

import { WebcastPushConnection } from 'tiktok-live-connector';

// Username of someone who is currently live
let liveTargetUsername = "narawitkaewbun916"; //xueputaloooooqoo1
let myCurrentUserSessionId = '2cf9aaa4427b3ae5e06b3a215a7cb028';

// Create a new wrapper object and pass the username
let tiktokLiveConnection = new WebcastPushConnection(liveTargetUsername);

// Connect to the chat (await can be used as well)
tiktokLiveConnection.connect().then(state => {
    console.info(`Connected to roomId ${state.roomId}`);
}).catch(err => {
    console.error('Failed to connect', err);
})

let count = 0;
// Define the events that you want to handle
// In this case we listen to chat messages (comments)
tiktokLiveConnection.on('chat', (data) => {
    // console.log(data);
    console.log(`${data.uniqueId} (userId:${data.userId}) writes: ${data.comment}`);
    io.sockets.emit('message', data);
})

// And here we receive gifts sent to the streamer
tiktokLiveConnection.on('gift', data => {
    console.log(`${data.uniqueId} (userId:${data.userId}) sends ${data.giftId}`);
    io.sockets.emit('gift', data);
})

// ...and more events described in the documentation below