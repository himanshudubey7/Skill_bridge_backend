const jwt = require('jsonwebtoken');
const { connect } = require('mongoose');
const connectedUsers = new Map();
const Message = require('./models/message');

function socketHandler(io){
    io.use((socket,next)=>{
        const token = socket.handshake.auth.token;
        console.log("received token:", token);
        if(!token) return next(new Error("Auth token missing"));
        try{
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log("decoded token ", decoded);
            socket.user = decoded.userId;
            next();

        }catch(err){
            next(new Error("Invalid token"));
        }
    });

    io.on("connection", (socket) =>{
        const userId = socket.user;
        console.log(socket.user);
        connectedUsers.set(userId, socket.id);
        console.log(`user connected : ${userId}`);


        socket.on("disconnect", ()=>{
            connectedUsers.delete(userId);
            console.log(`User diconnected : ${userId}`);

        });

        socket.on("send_message", async({to , message})=>{
            const from = socket.user.userId;
            const receiverSocketId = connectedUsers.get(to);

            await Message.create({from,to,message});

            if(receiverSocketId){
                io.to(receiverSocketId).emit("receive_message", {from, message});
                console.log(`message from ${from} to ${to}: ${message}`);
            }else{
                console.log(`user ${to} is not connected`);
            }
        });

    });
}
module.exports = socketHandler;