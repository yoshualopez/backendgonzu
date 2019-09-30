const Padres = require("./models/padres");
module.exports = {
    signin,
    signup,
    remove,
};
async function signin({email,password}){
    const user = await Padres.findOne({email});
    if(!user) {
        return ["error","Email doesn't exist."];
    }
    const validPassword = await user.comparePassword(password, user.password);
    if (!validPassword) {
        return ["error","Wrong Password."];
    }
    return ["success",user._id];
}
async function signup({email,password,fullname}){
    try {
        const padres = new Padres({email,password,fullname});
        padres.password = padres.encryptPassword(password);
        await padres.save();
        return ["success",padres._id];
    } catch (error) {
        return ["error","There was a problem registering your user"]
    }
}
async function remove({id}){
    try {
        await Padres.findOneAndDelete({_id : id});
        return ["success",padres._id];
    } catch (error) {
        return ["error","There was a problem remove user"]
    }
}