const notices = require("../modules/notices");
const auth = require("../modules/authentication");
const tokens = require("../modules/token");

module.exports = (app) => {
  app.route("/loggin").post(auth.login);
  app.route("/user/:id/:method").post(tokens.check.valid,tokens.upgradesession,auth.user);
  app.route("/validate").post(tokens.check.valid,tokens.upgradesession,auth.validate);
  app.route("/register").post(tokens.check.valid,tokens.upgradesession,auth.register);
  //tokens.check.valid,tokens.upgradesession
  app.route("/notices/add").post(notices.POST);
  app.route("/logout/:id").post(tokens.check.valid,auth.logout);
  //tokens.upgradesession,
  app.route("/register/:id/next").post(auth.registerOne);
  app.route("/register/:id/childrens").post(auth.addChildren);
};
