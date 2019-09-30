module.exports = function({socket}){
    socket.on("newMessage",(data) =>{
        console.log("ws message")
    });
    const oldMessage = [];
    socket.emit("oldMessage",oldMessage);
}