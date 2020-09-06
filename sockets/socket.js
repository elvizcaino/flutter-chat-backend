const { io } = require('../index');

const { checkJWT } = require('../helpers/jwt');
const { userConnected, userDisonnected, saveMessage } = require("../controllers/socket");


// Mensajes de Sockets
io.on('connection', (client) => {
    console.log('Cliente conectado');

    const [ valid, uid] = checkJWT(client.handshake.headers["x-token"]);

    // Verificar auntenticación
    if(!valid) {
        return client.disconnect();
    }

    // Cliente autenticado
    userConnected(uid);

    // Ingresar al cliente a una sala específica
    client.join(uid);

    // Escuchar del cliente el mensaje
    client.on("personal-message", async(payload) => {
        // Guardar message
        await saveMessage(payload);
        
        io.to(payload.to).emit("personal-message", payload);
    });

    console.log("Cliente autenticado");

    client.on('disconnect', () => {
        userDisonnected(uid);
    });

    /* client.on('mensaje', ( payload ) => {
        console.log('Mensaje', payload);

        io.emit( 'mensaje', { admin: 'Nuevo mensaje' } );

    }); */


});
