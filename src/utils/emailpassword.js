const isEmail = require("validator/lib/isEmail");
const isPassword = require("validator/lib/isLength");
const keyword = require("./keywords");
const emailValidation = function(email) {
  const isEmailCorrect = isEmail(email);
  const emailMessage = {
    isEmpty: false,
    message: ""
  };
  isEmailCorrect
    ? (emailMessage.isEmpty = true)
    : (emailMessage.message = keyword.english.emailSintaxFail);
  return emailMessage;
};
const passwordValidation = function(password) {
  const passwordLength = { min: 4 };
  const isPaswordCorrect = isPassword(password, passwordLength);
  const passwordMessage = {
    isEmpty: false,
    message: ""
  };
  isPaswordCorrect
    ? (passwordMessage.isEmpty = true)
    : (passwordMessage.message = keyword.english.passwordLengthFail);

  return passwordMessage;
};
module.exports = {
  emailValidation,
  passwordValidation
};
