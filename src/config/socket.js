module.exports = (server) => {
    let users = {};


    const socketIO = require('socket.io');

    const io = socketIO.listen(server);

    io.on('connection', socket => {
        console.log('nuevo usuario');

        socket.on('enviar mensaje', (mensaje, cb) => {

            var mje = mensaje.trim();

            if (mje.substr(0, 3) === '/p ') {
                mje = mje.substr(3);
                const index = mje.indexOf(' ');
                if (index !== -1) {
                    var name = mje.substring(0, index);
                    mje = mje.substring(index + 1);
                    if(name in users){
                        users[name].emit('privado', {
                            mje,
                            usuario: socket.user
                        });
                    }else{
                        cb('Error! escribe un usuario valido')
                    }
                }
                else{
                    cb('Error! por favor ingresa tu mensaje')
                }
            }else{
                /*var newMje = new Chat({
                    userName: socket.user,
                    mje
                });

                await newMje.save();*/

                io.sockets.emit('envio:mensaje', {
                    mje,
                    usuario: socket.user
                })
            }

        });

        socket.on('nuevo usuario', (usuario, cb) => {
            if (usuario in users) {
                cb(false);
            } else {
                cb (true);
                socket.user = usuario;
                users[socket.user] = socket;
                io.sockets.emit('usuarios', Object.keys(users));
            }
        });

        socket.on('disconnect', (data) => {
            if(!socket.user) return;

            delete users[socket.user];
            io.sockets.emit('list users', Object.keys(users));
        });
    });
}