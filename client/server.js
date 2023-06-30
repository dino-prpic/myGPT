// ANCHOR Environment Variables
const env = {
    PORT: 3000,
    API_PORT: 5000,
    DOMAIN: 'localhost',
}


// ANCHOR Express

const http = require('http');
const express = require('express');
const app = express();
app.use(express.json()); // for parsing application/json
const server = http.createServer(app);
server.listen(env.PORT, () => { console.log(`Server running on http://${env.DOMAIN}:${env.PORT}`); });



// ANCHOR Socket.io

const { Server } = require('socket.io');
const io = new Server(server);




// SECTION APP

app.use(express.static('static'));
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/static/index.html');
});

app.post('/pushAnswer', (req, res) => { 
    console.log('pushAnswer');
    console.log(req.body);
    res.send('ok');

    io.emit('updateQuery', req.body);
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => { console.log('user disconnected'); });

    socket.on('newQuery', (msg) => {
        console.log(msg);
        host='192.168.1.114'
        port=5000
        endpoint='/query'
        app.post('http://'+host+':'+port+endpoint, msg, (res) => {
            console.log(res);

        });
    });
});




