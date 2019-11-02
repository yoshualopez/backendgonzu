const iNeed = require("../complements");

async function user(req, res, next) {
  console.log(req.body.body);
  const id = req.params.id;
  const method = req.params.method;
  const accountType = req.body.body.accountType;
  const email = req.body.body.email;
  const fullname = req.body.body.fullname;
  const gender = req.body.body.gender;
  const permissions = req.body.body.permissions;
  const teacherAssignature = req.body.body.teacherAssignature;
  const teacherTutor = req.body.body.teacherTutor;
  const token = res.locals.token || res.locals.newtoken;

  if (method == "UPDATE") {
    const userToUpdate = await iNeed.databaseUser.model.findById({ _id: id });
    if (!userToUpdate) {
      res.status(200).json({
        response: "",
        error: iNeed.log.english.dbUserNotFound,
        auth: false
      });
    }
    console.log("accountType => ",accountType);
    const userSuccesUpdate = await iNeed.databaseUser.model.findOneAndUpdate({_id : userToUpdate._id},{
      accountType : accountType ? accountType : userToUpdate.accountType,
      email : email ? email : userToUpdate.email,
      fullname : fullname ? fullname : userToUpdate.fullname,
      gender : gender ? gender : userToUpdate.gender,
      permissions : permissions ? permissions : userToUpdate.permissions,
      teacherAssignature : teacherAssignature ? teacherAssignature : userToUpdate.teacherAssignature,
      teacherTutor : teacherTutor ? teacherTutor : userToUpdate.teacherTutor
    },{new : false});
    return res.status(200).json({
      auth : true,
      error : "",
      response : {
        token : token,
        userSuccesUpdate
      }
    });
  }
}
module.exports = {
  user
};
