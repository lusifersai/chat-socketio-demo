var socket = io();
var sendButton = document.getElementById("send");
var nameInput = document.getElementById("nameinput");
var messageInput = document.getElementById("messageinput");

sendButton.addEventListener("click", sendMessage);

window.addEventListener("keypress", function (event) {
    var keyCode = event.which || event.keyCode || 0;
    if (keyCode === 13) {
        sendMessage();
    }
});

socket.on('chat', function (data) {
    console.log('RECEIVED: name: ' + data.name + ', message: ' + data.message);
    displayNewMessage(data.name, data.message);
});


function sendMessage(event) {
    console.log('SENDING: name: ' + nameInput.value + ', message: ' + messageInput.value);
    socket.emit('chat', { name: nameInput.value, message: messageInput.value });
    messageInput.value = '';
}

function displayNewMessage(username, message) {
    var newMessage = document.createElement('div');
    newMessage.className = 'message';

    var newMessageUser = document.createElement('span');
    newMessageUser.className = 'username';
    newMessageUser.innerText = username;

    var messageTextNode = document.createTextNode(': ' + message);

    newMessage.appendChild(newMessageUser);
    newMessage.appendChild(messageTextNode);

    document.getElementById('chat').appendChild(newMessage);

    window.scrollTo(0, document.body.scrollHeight);
}
