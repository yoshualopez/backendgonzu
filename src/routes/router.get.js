const notices = require("../modules/notices");
const tokens = require("../modules/token");

module.exports = (app) => {
  app.route("/notices/:id").get(notices.GET);
  app.route("/notice/:id").get(notices.GETById);
}