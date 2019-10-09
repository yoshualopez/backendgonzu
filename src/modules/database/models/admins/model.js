const { Schema, model} = require("mongoose");
const adminaccount = new Schema({
    type : String,
},{collection : "adminstype"});
module.exports = model("adminstype", adminaccount);