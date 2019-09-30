const { Schema, model } = require("mongoose");
const sessions = new Schema({
    token : { 
        type : String,
        userId : String, 
    },
});
module.exports = model("sessions",sessions);