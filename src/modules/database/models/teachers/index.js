const TeacherModel = require("./model");

module.exports = {
    generate,
}
async function generate({charge,course}){
    const tempModel = new TeacherModel({
        charge : charge,
        tutor : {
            course : course,
        },
    });
    const model = await tempModel.save();
    return model;
}