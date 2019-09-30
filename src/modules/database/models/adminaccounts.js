const { Schema, model} = require("mongoose");
const bcrypt = require("bcryptjs");
const adminaccount = new Schema({
    email: String,
    password: String,
    isTeacher: {
        type: Boolean,
        default: false,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    teacherType: String,
},{collection : "adminaccount"});
adminaccount.methods.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
};

adminaccount.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
};
module.exports = model("adminAccounts", adminaccount);