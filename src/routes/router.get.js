const notices = require("../modules/notices");
const tokens = require("../modules/token");

module.exports = (app) => {
  app.route("/notices/:count").get(notices.GET);
  app.route("/notice/:id").get(notices.GETById);
}