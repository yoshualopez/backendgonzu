const Adminaccounts = require("./models/adminaccounts");
module.exports = {
    signin,
    signup,
    remove,
};
async function signin({email,password}){
    const user = await Adminaccounts.findOne({email});
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
        const adminaccounts = new Adminaccounts({email,password,fullname});
        adminaccounts.password = adminaccounts.encryptPassword(password);
        await adminaccounts.save();
        return ["success",adminaccounts._id];
    } catch (error) {
        return ["error","There was a problem registering your user"]
    }
}
async function remove({id}){
    try {
        await Adminaccounts.findOneAndDelete({_id : id});
        return ["success"];
    } catch (error) {
        return ["error","There was a problem remove user"]
    }
}