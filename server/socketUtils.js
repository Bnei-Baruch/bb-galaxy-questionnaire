
let io;

let setSocket = server => {
    console.log('set socket');
    io = require('socket.io')(server);
    io.on('connection', function (client) {
        console.log('socket connect')
        client.on('event', function (data) {
            console.log('event', data);
        });
        client.on('disconnect', function () { });
    });
}

function pushToClient(data) {
    console.log('push to client');
    try{
        io.sockets.emit('pushFromServer', data);
    } catch(err) {
        console.log('socket err', err);
    }
}

module.exports = {
    setSocket,
    pushToClient,
}