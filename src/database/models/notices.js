const { Schema, model } = require("mongoose");
const notices = new Schema({
    autor : String,
    title : String,
    redacted : String,
    baseImage : String,
    publishDate : Number,
    imagesNotice : [String]
});
module.exports = model("notices",notices);