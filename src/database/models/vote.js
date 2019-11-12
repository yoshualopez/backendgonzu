const { Schema, model } = require("mongoose");

const voteModel = new Schema(
  {
    identicard : String,
    enrollmentcode : String,
    courseSection : String,
    course : String,
    parallel : String,
    listSelect: String
  },
  { collection: "votes" }
);

module.exports = model("votes", voteModel);
