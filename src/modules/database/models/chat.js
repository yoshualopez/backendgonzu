const { Schema, model } = require("mongoose");
const chat = new Schema({});
module.exports = model("chat",chat);