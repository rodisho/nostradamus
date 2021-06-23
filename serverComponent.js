/*Block  below to define all import statments*/
const socketio = require('socket.io')
const http = require('http');
const path = require('path');
const express = require('express');
const formatMsg = require('./server/messagesComponent');
const {connectUser, , userLeave, getRoomUsers} = require('./server/usersComponent');



// Initialize variables to use libraries
const app = express();
const server = http.createServer(app); // create server directly and pass app into it
const io = socketio(server);


// SET STATIC FOLDER
app.use(express.static(path.join(__dirname, 'client')));
const NostradamusServer = 'Sign in time';

// Start once client is on 
// Open bi-directional communication between server and client
io.on('connection', socket => {
socket.on('connectChatRoom', ({nickname, chatRoom}) => {

    const user = connectUser(socket.id, nickname, chatRoom);

    socket.join(user.chatRoom); 

    // Welcome current user
    socket.emit('message', formatMsg(NostradamusServer, 'Welcome to Nostradamus'));

    //Broadcast when new user log in
    // to method call will emit to the specific room
    socket.broadcast.to(user.chatRoom).emit('message', formatMsg(NostradamusServer, `${user.nickname} joined the chatroom` ));

    // show users + chatroom information
    io.to(user.chatRoom).emit('roomUsers', {
        room: user.cha,
        users: getRoomUsers(user.room)
    })

});
    // Listen for chatmessage
    socket.on('chatMessage', (msg) => {
        const user = getActiveUser(socket.id);

        // message send will be re-emited to other users inside chatroom
        io.to(user.room).emit('message', formatMsg(user.nickname,msg));
    })

    // Broadcast when client disconnects
    socket.on('disconnect', () => {
        const user = userLeave(socket.id);
        if(user){
            // emit to everyone that X user has left the chat
            io.to(user.room).emit('message', formatMsg(NostradamusServer, `${user.nickname} exit the chatroom`));

            // show users + chatroom information
            io.to(user.room).emit('roomUsers', {
                room: user.room,
                users: getRoomUsers(user.room)
         });
        }
    });

});

// Setup Server to handle Socket

const PORT = 8080 || process.env.PORT;

// In this case we access server directly instead of using express to access socket
server.listen(PORT, () => console.log(`Nostradamus App is running on port ${PORT}`));