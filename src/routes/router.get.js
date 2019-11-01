const notices = require("../modules/notices");
const tokens = require("../modules/token");

module.exports = (app) => {
  app.route("/notices").get(tokens.check.valid,tokens.upgradesession, notices.GET);
  app.route("/notices/:id").get(notices.GET);
}