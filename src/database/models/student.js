const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");
const studentModel = new Schema(
  {
    ci: String,
    lastName: String,
    FirstName: String,
    subscribe: String,
    matricula: String,
  },
  { collection: "students" }
);
module.exports = model("students", studentModel);
