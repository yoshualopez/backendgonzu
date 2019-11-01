const iNeed = require("../complements");

async function registerUserStepOne(req, res, next) {
  
  const id = req.body.id || req.params.id;
  const teacherAssignature = req.body.teacherAssignature || "";
  const teacherTutor = req.body.teacherTutor || "";
  const permissions = req.body.permissions || [];

  const registerResponse = await iNeed.databaseUser.signupcomplete(id,teacherAssignature,teacherTutor,permissions);
  if (registerResponse.hasError) {
    return res.status(401).json({
      auth: false,
      response: {},
      error: registerResponse.message
    });
  }
  return res.status(200).json({ 
    auth: true, 
    response: registerResponse, 
    error: "" 
  });
}
module.exports = registerUserStepOne;