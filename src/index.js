require("dotenv").config();
const express = require("express");
const bodyparser = require("body-parser");
const path = require("path");
const socket = require("socket.io");
const router = require("./modules/http");
const app = express();
require("./modules/database/connect");

app.use(express.json());
app.use(bodyparser.urlencoded({ extended : false }));
app.use("/",router);
app.use(express.static(path.join( __dirname, "public")));

const server = app.listen(process.env.PORT || 3000, () => {
    console.log("UP")
});
const io = socket.listen(server);
require("./modules/websockets")(io);