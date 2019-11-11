const { Schema, model } = require("mongoose");

const voteModel = new Schema(
  {
    Firstname: String,
    lastName : String,
    ci: String,
    enrollment : String,
    listSelect: String
  },
  { collection: "votes" }
);

module.exports = model("votes", voteModel);
