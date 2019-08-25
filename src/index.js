const app = require('./config/server');

const server = app.listen(app.get('port'), () => {
    console.log('aplicacion en el puerto', app.get('port'))
});

require('./config/socket')(server);