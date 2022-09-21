const io = require('socket.io')(3000);
const users = {};
io.on('connection', socket => {
    socket.on('new_user', username => {
        console.log("New User", username)
        users[socket.id] = username;
        socket.broadcast.emit('join', username);
    });
    socket.on('send', message => {
        socket.broadcast.emit('receive', { message: message, username: users[socket.id] })
    });
    socket.on('disconnect', message => {
        socket.broadcast.emit('leave', users[socket.id])
        delete users[socket.id];
    });
})