const iNeed = require("../complements");

module.exports = async function validate(req, res) {
  const id = res.locals.tokenid;
  const token = res.locals.token || res.locals.newtoken;
  const user = await iNeed.databaseUser.model.findById({ _id: id });
  if (!user) {
    return res.status(401).json({
      response: {},
      auth: false,
      error: iNeed.log.english.dbUserNotFound
    });
  }
  return res.status(200).json({
    response: {
      accountType: user.accountType,
      email: user.email,
      id: user._id,
      token: token,
      permissions: user.permissions
    },
    auth: true,
    error: ""
  });
};
