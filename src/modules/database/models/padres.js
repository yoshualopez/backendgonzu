const { Schema, model} = require("mongoose");
const bcrypt = require("bcryptjs");
const padres = new Schema({
    fullname : String,
    email: String,
    password: String,
    photoURL: String,
    childrens : [
        {
            gender : String,
            fullName : String,
            age : Number,
            course : {

            }
        }
    ]
},{collection : "padres"});
padres.methods.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
};

padres.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
};
module.exports = model("padres", padres);