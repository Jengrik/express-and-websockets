const socket = io();

//* DOM Elements
const btn = document.querySelector('#send');
const output = document.querySelector('#output');

btn.addEventListener('click', () => {
    let data = {
        message: message.value,
        username: username.value
    };
    console.log(data);
    socket.emit('chat:MessageFromClient', data)
})

socket.on('chat:MessageFromServer', (data) => {
    console.log('Llego un mensaje del Servidor')
    output.innerHTML += `<p>
        <strong>${data.username}</strong>: ${data.message}
    </p>`;
})

socket.on('chat:Initialize', (data) => {
    data.forEach(element => {
        output.innerHTML += `<p>
        <strong>${element.username}</strong>: ${element.message}
    </p>`;
    });
    console.log('Initialization Completed!')
})
