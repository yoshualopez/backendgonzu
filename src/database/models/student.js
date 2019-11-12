const { Schema, model } = require("mongoose");
const studentModel = new Schema(
  {
    identicard: String,
    firstlastname: String,
    secondlastname: String,
    firstname: String,
    secondname: String,
    email: String,
    sex: String,
    country: String,
    birthplace: String,
    birthday: String,
    parish: String,
    address: String,
    enrollmentcode: String,
    courseSection: String,
    course: String,
    parallel: String,
    retired: String
  },
  { collection: "students" }
);
module.exports = model("students", studentModel);
