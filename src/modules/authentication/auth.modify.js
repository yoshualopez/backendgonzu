const iNeed = require("../complements");

async function user(req, res, next) {
  console.log(req.params.id, req.params.method);
  const id = req.params.id;
  const method = req.params.method;
  const token = res.locals.token || res.locals.newtoken;

  if (method == "GET") {
    const user = await iNeed.databaseUser.getUserById(id);
    if (user.hasError) {
      return res.status(200).json({
        auth: false,
        error: user.data,
        response: {
          token: token,
          user: user
        }
      });
    }
    return res.status(200).json({
      auth: true,
      error: "",
      response: {
        token: token,
        user: user.data
      }
    });
  }
  const accountType = req.body.accountType || "";
  const email = req.body.email || "";
  const fullname = req.body.fullname || "";
  const gender = req.body.gender || "";
  const permissions = req.body.permissions || [];
  const teacherAssignature = req.body.teacherAssignature || "";
  const teacherTutor = req.body.teacherTutor || "";

  if (method == "UPDATE") {
    const userToUpdate = await iNeed.databaseUser.model.findById({ _id: id });
    if (!userToUpdate) {
      return res.status(200).json({
        response: "",
        error: iNeed.log.english.dbUserNotFound,
        auth: false
      });
    }
    console.log("accountType => ", accountType);
    const userSuccesUpdate = await iNeed.databaseUser.model.findOneAndUpdate(
      { _id: userToUpdate._id },
      {
        accountType: accountType ? accountType : userToUpdate.accountType,
        email: email ? email : userToUpdate.email,
        fullname: fullname ? fullname : userToUpdate.fullname,
        gender: gender ? gender : userToUpdate.gender,
        permissions: permissions ? permissions : userToUpdate.permissions,
        teacherAssignature: teacherAssignature ? teacherAssignature : userToUpdate.teacherAssignature,
        teacherTutor: teacherTutor ? teacherTutor : userToUpdate.teacherTutor
      },
      { new: false }
    );
    return res.status(200).json({
      auth: true,
      error: "",
      response: {
        token: token,
        userSuccesUpdate
      }
    });
  }
}
module.exports = {
  user
};
