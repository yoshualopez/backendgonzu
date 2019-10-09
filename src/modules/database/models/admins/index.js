const AdminModel = require("./model");

module.exports = {
    generate,
}
async function generate({type}){
    const tempModel = new AdminModel({
        type : type,
    });
    const model = await tempModel.save();
    return model;
}