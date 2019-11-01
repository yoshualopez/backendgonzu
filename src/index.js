require("dotenv").config();
const express = require("express");
const bodyparser = require("body-parser");
const path = require("path");
const app = express();
const cors = require("cors");
const socketio = require("socket.io");
require("./database/connect");

app.use(cors());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
require("./server")(app);
app.use("/phothos", express.static(path.join(__dirname, "phothos")));
app.use("/docs", express.static(path.join(__dirname, "docs")));

app.set("PORT", process.env.PORT || 3000);
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: false }));

const server = app.listen(app.get("PORT"), () => {
    console.log("Server UP");
});
const io = socketio.listen(server);
require("./websockets")(io);
module.exports = server;
