const socket = io('http://localhost:3000', { transports: ['websocket'] });
const form = document.getElementById('input_container');
const messageInput = document.getElementById('message_input');
const messageContainer = document.querySelector('.container');
var notification = new Audio('notification.mp3'); 
const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message')
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position==='left'){
        notification.play();
    }
};
form.addEventListener('submit', (event) => {
    event.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = "";
})
const username = prompt("Enter your name to join");
socket.emit('new_user', username);
socket.on('join', username => {
    append(`${username} joined the chat`, 'right');
})
socket.on('receive', data => {
    append(`${data.username}: ${data.message}`, 'left');
})
socket.on('leave', username => {
    append(`${username} left the chat`, 'left')
})