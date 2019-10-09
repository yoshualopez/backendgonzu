const { Schema, model} = require("mongoose");
const bcrypt = require("bcryptjs");
const adminaccount = new Schema({
    email: String,
    password: String,
    fullname : String,
    lastjob : String,
    isTeacher: {
        type: Boolean,
        default: false,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    adminType : String,
    teacherType: String,
    permissions : {
        notices : {
            type : Boolean,
            default : false,
        },
        store : {
            type : Boolean,
            default : false,
        },
        chat : {
            type : Boolean,
            default : false,
        },
    }
},{collection : "user"});
adminaccount.methods.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
};
adminaccount.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
};
module.exports = model("user", adminaccount);