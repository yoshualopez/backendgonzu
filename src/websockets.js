const database = require("./database");
module.exports = function(io){
  io.on("connection",async function(socket){
    socket.emit("notice",await database.notice.getAll());
    socket.emit("users",await database.user.model.find({}).sort("-fullname"));
  });
}