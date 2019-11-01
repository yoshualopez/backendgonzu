const notices = require("../modules/notices");
const auth = require("../modules/authentication");
const tokens = require("../modules/token");

module.exports = (app) => {
  app.route("/loggin").post(auth.login);
  app.route("/register").post(tokens.check.needAreAdmin,tokens.upgradesession,auth.register);
  app.route("/notices/add").post(tokens.check.needAreAdmin,tokens.upgradesession,notices.POST);
  app.route("/logout/:id").post(tokens.check.valid,auth.logout);
  //tokens.check.needAreAdmin,tokens.upgradesession,
  app.route("/register/:id/next").post(auth.registerOne);
  app.route("/register/:id/childrens").post(auth.addChildren);
};
