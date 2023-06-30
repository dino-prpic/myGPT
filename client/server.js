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

const axios = require('axios');


// ANCHOR Socket.io

const { Server } = require('socket.io');
const io = new Server(server);



app.use(express.static('static'));
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/static/index.html');
});

app.post('/pushAnswer', (req, res) => {
  //post requst in json format

    res.setHeader('Content-Type', 'application/json');

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
       //send post request to api
        axios.post(`http://localhost:${env.API_PORT}/query`, msg)
            .then((res) => {
               // console.log(`statusCode: ${res.status}`);
                  io.emit('updateQuery', res.data);
            }
            )
            .catch((error) => {
                console.error(error)
            }
            )
    });
});





