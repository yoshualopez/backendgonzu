const { Schema, model} = require("mongoose");
const adminaccount = new Schema({
    charge : String,
    tutor : {
        course : String,
        
    }
},{collection : "teacherstype"});
module.exports = model("teacherstype", adminaccount);