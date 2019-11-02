const login = require("./auth.login");
const register = require("./auth.register");
const registerOne = require("./register.one");
const validate = require("./auth.validate");
const { user } = require("./auth.modify");
const addChildren = require("./register.children");
module.exports = {
  validate,
  login,
  user,
  register,
  logout,
  registerOne,
  addChildren
};
function logout(req, res) {
  return res.status(200).json({ auth: false, response: { token: "" } });
}
