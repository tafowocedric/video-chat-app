// const app = require('./app');
// const http = require('http');
// const { ExpressPeerServer } = require('peer');

// const port = process.env.PORT || 3030;
// const host = process.env.HOST || 'localhost';

// const server = http.createServer(app);

// const peerServer = ExpressPeerServer(server, { debug: true });
// app.use('/peerjs', peerServer);

// server.listen(port, () => console.log(`\nServer started on port http://${host}:${port}\n`));

// server.js
const express = require('express');
const { v4: uuidv4 } = require('uuid');

const app = express();
const server = require('http').Server(app);

app.set('view engine', 'ejs');

const io = require('socket.io')(server);

const { ExpressPeerServer } = require('peer');
const peerServer = ExpressPeerServer(server, { debug: true });

app.use('/peerjs', peerServer);
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.redirect(`/${uuidv4()}`);
});

app.get('/:room', (req, res) => {
    res.render('room', { roomId: req.param.room });
});

io.on('connection', (socket) => {
    socket.on('join-room', (roomId, userId) => {
        socket.join(roomId);
        socket.to(roomId).emit('user-connected', userId);
    });
});

server.listen(3030);
