const websocket = require("./ws");
module.exports = (io) => {
    io.on("connection", (socket) => {
        websocket.chat({socket});
        console.log("Conectado", socket.id);
        socket.on('disconnect', data => {
            console.log("Desconectado", socket.id)
        });
    });
}