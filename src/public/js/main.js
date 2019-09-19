$(document).ready(function() {
    const socket = io();

    $('#error').hide();

    $('#form-chat').submit(function(e) {
        e.preventDefault();
        socket.emit('enviar mensaje', $('#mensaje').val(), data => {
            $('#mensajes').append(`<p class='alert-danger'>${data}</p>`)
        });

        $('#mensaje').val('');
    });

    socket.on('envio:mensaje', function (mensaje) {
        $('#mensajes').append(`<p><b>${mensaje.usuario}: </b>${mensaje.mje}</p>`);
    });

    socket.on('privado', function (mensaje) {
        $('#mensajes').append(`<p class="mensajeEspeciales"><b>${mensaje.usuario}: </b>${mensaje.mje}</p>`)
    });

    $('#form-login').submit(function(e) {
        e.preventDefault();
        socket.emit('nuevo usuario', $('#usuario').val(), data => {
            if (data) {
                $('#login').addClass('d-none');
                $('#chat').removeClass('d-none');
            } else {
                $('#error').text('Ese usuario ya existe');
                $('#error').show();
            }
        });
    });

    socket.on('usuarios', function(usuarios){
        var html = '';
        for (let i=0; i < usuarios.length; i++){
            html += `<p><i class="fa fa-user"></i> ${usuarios[i]}</p>`
        }

        $('#usuarios').html(html);
    });

});