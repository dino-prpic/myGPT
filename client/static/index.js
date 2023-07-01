import { io } from "/socket.io/socket.io.esm.min.js";
const socket = io();

const form = document.getElementById('form');
const input = document.getElementById('input');
const chatEL = document.getElementById('messages');
const loadPrevious = document.getElementById('loadPrevious');

import Chat from './chat.js';
const chat = new Chat(chatEL);

form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (input.value) {
        const query = chat.newQuery(input.value);
        socket.emit('newQuery', query.export());
        input.value = '';
    }
});

loadPrevious.addEventListener('click', function (e) {
    e.preventDefault();
    socket.emit('loadOlder', 7);
});

// on event
socket.on('updateQuery', function (msg) {
    console.log('updateQuery', msg);
    chat.update(msg);
});

// when connected
socket.on('connect', () => {
    console.log('connected');
    socket.emit('loadOlder', 1);
});