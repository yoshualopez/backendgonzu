const database = require("./database");
module.exports = function(io){
  io.on("connection",async function(socket){
    socket.emit("notices",await database.notice.getAll(10));
  });
}