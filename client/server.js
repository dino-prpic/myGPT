// ANCHOR Environment Variables
const dotenv = require('dotenv');
dotenv.config({ path: '../.env' });


// ANCHOR Express

const http = require('http');
const express = require('express');
const app = express();
app.use(express.json()); // for parsing application/json
const server = http.createServer(app);
server.listen(process.env.CLIENT_PORT, () => { console.log(`Server running on http://${process.env.CLIENT_HOST}:${process.env.CLIENT_PORT}`); });

const axios = require('axios');


// ANCHOR Socket.io

const { Server } = require('socket.io');
const io = new Server(server);




// SECTION APP

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
        axios.post(`http://${process.env.API_HOST}:${process.env.API_PORT}/query`, msg)
            .then((res) => {
                console.log(`statusCode: ${res.status}`);
            })
            .catch((error) => {
                console.error(error)
            })
    });
});





