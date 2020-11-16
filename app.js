const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 8000;

app.use(express.static('public'));

http.listen(port, function () {
    console.log('Listening on port ' + port);
});

io.sockets.on('connection', function (socket) {
    console.log('A user connected!');
    socket.on('chat', function (data) {
        console.log('CHAT: name: ' + data.name + ', message: ' + data.message);
        io.sockets.emit('chat', data);
    });
});