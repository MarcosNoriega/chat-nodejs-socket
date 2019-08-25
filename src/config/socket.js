module.exports = (server) => {
    const socketio = require('socket.io');

    const io = socketio.listen(server);

    io.on('connection', socket => {
        console.log('nuevo usuario');

        socket.on('enviar mensaje', mensaje => {
            io.sockets.emit('nuevo mensaje', mensaje);
        });
    });
}