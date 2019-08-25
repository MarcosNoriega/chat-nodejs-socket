$(document).ready(function() {
    const socket = io();

    $('#form-chat').submit(function(e) {
        e.preventDefault();
        socket.emit('enviar mensaje', $('#mensaje').val());
        $('#mensaje').val('');
    });

    socket.on('nuevo mensaje', function (mensaje) {
        $('#mensajes').append('<b>' + mensaje + '</b>');
    });

});