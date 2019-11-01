const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");
const userModel = new Schema(
  {
    fullname: String,
    photoURL: String,
    email: String,
    password: String,
    permissions: [String],
    accountType: String,
    gender: String,
    teacherAssignature: String,
    teacherTutor: String,
    childrens: [String]
  },
  { collection: "user" }
);
userModel.methods.encryptPassword = async password => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};
userModel.methods.comparePassword = async function(password) {
  return bcrypt.compare(password, this.password);
};
module.exports = model("user", userModel);
