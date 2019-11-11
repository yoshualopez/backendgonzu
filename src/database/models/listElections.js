const { Schema, model } = require("mongoose");
const voteModel = new Schema(
  {
    electionYear: Date,
    status: String,
    listWinner: String,
    votes: [String],
    lists: [
      {
        coverName: String,
        nickNameList: String,
        nickNameListMeaning: String,
        nickLogoUrl: String,
        imageGroupUrl : String,
        integrants: [
          {
            fullname: String,
            course: String,
            position: String,
            age: Number
          }
        ]
      }
    ]
  },
  { collection: "listelections" }
);
module.exports = model("listelections", voteModel);
