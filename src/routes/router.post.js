const notices = require("../modules/notices");
const student = require("../database/student");
const auth = require("../modules/authentication");
const vote = require("../database/votes");
const listElections = require("../database/listElections");
const tokens = require("../modules/token");

module.exports = app => {
  app.route("/loggin").post(auth.login);
  app.route("/validate").post(tokens.check.valid, tokens.upgradesession, auth.validate);
  app.route("/register").post(tokens.check.valid, tokens.upgradesession, auth.register);
  app.route("/notices/add").post(tokens.check.valid, tokens.upgradesession, notices.POST);
  app.route("/user/:id/:method").post(tokens.check.valid, tokens.upgradesession, auth.user);
  app.route("/logout/:id").post(tokens.check.valid, auth.logout);
  app.route("/register/:id/next").post(tokens.check.valid, tokens.upgradesession, auth.registerOne);
  app.route("/register/:id/childrens").post(tokens.check.valid, tokens.upgradesession, auth.addChildren);
  app.route("/defray").post(vote.vote);
  app.route("/student/:filter").post(student.findByStudent);
  app.route("/createcampaign").post(listElections.postCampaign);
};
