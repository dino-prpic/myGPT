import { io } from "/socket.io/socket.io.esm.min.js";
const socket = io();

const form = document.getElementById('form');
const input = document.getElementById('input');
const chatEL = document.getElementById('messages');

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

// on event
socket.on('updateQuery', function (msg) {
    console.log(msg);
    chat.update(msg);
});