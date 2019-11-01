const { Schema, model } = require("mongoose");
const childrenModel = new Schema(
  {
    childrenGender: String,
    childrenFullname: String,
    childrenAge: String,
    childrenCourse: String,
    parent: String
  },
  { collection: "childrens" }
);
module.exports = model("childrens", childrenModel);
/**
 * const TeacherModel = require("./model");

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

{
  childrenGender: String,
  childrenFullname: String,
  childrenAge: String,
  ChildrenCourse: String,
  parent : String,
}

var estesi = function(){
  var cars = [{mode : "audi"},{mode : "camaro"}];
  var resut = [];
  cars.map((ese) =>{
    return resut.push(ese.mode);
  });
  return resut;
}
console.log(estesi())

var ese = function(){
  var ete = [];
  for(var i = 0;i < 10;i++){
    ete.push(i);
  }
  return ete;
}
console.log(ese());
 */
