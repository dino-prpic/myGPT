// ANCHOR Environment Variables
const dotenv = require('dotenv');
dotenv.config({ path: '../.env' });


// ANCHOR Express

const http = require('http');
const express = require('express');
const app = express();
app.use(express.json()); // for parsing application/json
const server = http.createServer(app);
server.listen(process.env.CLIENT_PORT, () => { console.log(`Open http://${process.env.CLIENT_HOST}:${process.env.CLIENT_PORT} in your browser`); });

const axios = require('axios');


// ANCHOR Socket.io

const { Server } = require('socket.io');
const io = new Server(server);


// ANCHOR Backups
const backups = require('./backup.js');


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

    backups.save(req.body);
    io.emit('updateQuery', req.body);
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.waitlist = backups.list();

    socket.on('disconnect', () => { console.log('user disconnected'); });

    socket.on('loadOlder', (quantity) => {
        console.log('loadOlder');
        console.log(quantity);
        for (let i = 0; i < quantity; i++) {
            const id = socket.waitlist.pop();
            if (!id) break;
            const query = backups.load(id);
            socket.emit('updateQuery', query);
        }
    });

    socket.on('newQuery', (query) => {
        console.log(query);
        //send post request to api
        axios.post(`http://${process.env.API_HOST}:${process.env.API_PORT}/query`, query)
            .then((res) => {
                console.log(`statusCode: ${res.status}`);
            })
            .catch((error) => {
                console.error(error)
            })
    });
});





