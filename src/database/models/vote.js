const { Schema, model } = require("mongoose");

const voteModel = new Schema(
  {
    fullname: String,
    ci: Number,
    age: Number,
    course: String,
    listSelect: String
  },
  { collection: "votes" }
);

module.exports = model("votes", voteModel);
