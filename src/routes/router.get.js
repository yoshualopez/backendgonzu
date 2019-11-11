const notices = require("../modules/notices");
const listElections = require("../database/listElections");
const tokens = require("../modules/token");


module.exports = (app) => {
  app.route("/campaign").get(listElections.getCampaign)
  app.route("/notices/:count").get(notices.GET);
  app.route("/notice/:id").get(notices.GETById);
}