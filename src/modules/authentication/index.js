const login = require("./auth.login");
const register = require("./auth.register");
const registerOne = require("./register.one");
const addChildren = require("./register.children");
module.exports = {
  login,
  register,
  logout,
  registerOne,
  addChildren
};

function logout(req,res){
  return res.status(200).json({ auth: false, token: "" })
}
