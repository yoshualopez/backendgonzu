const database = require("../database");
const utils = require("../utils");
const token = require("./token");

module.exports = {
  databaseNotices : database.notice,
  databaseNoticesModel : database.notice.model,
  databaseUser : database.user,
  databaseUserModel : database.user.model,
  log : utils.keyword,
  uniqueID : utils.key,
  crendential : utils.credential,
  newToken : token.newToken,
  validToken : token.check.valid
};
