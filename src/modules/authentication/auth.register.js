const iNeed = require("../complements");

async function registerUser(req, res) {
  const email = req.body.email || "";
  const password = req.body.password || "";
  const fullname = req.body.fullname || "";
  const accountType = req.body.accountType || "basic";
  const gender = req.body.gender || "";

  const isPasswordCorrect = iNeed.crendential.passwordValidation(password);
  const isEmailCorrect = iNeed.crendential.emailValidation(email);
  if (gender == "" || fullname == "") {
    return res.status(401).json({
      auth: false,
      response: {},
      error: iNeed.log.english.unspectedError
    });
  }
  if (!isPasswordCorrect.isEmpty || !isEmailCorrect.isEmpty) {
    return res.status(401).json({
      auth: false,
      response: {},
      error: isPasswordCorrect.message + isEmailCorrect.message
    });
  }
  const registerResponse = await iNeed.databaseUser.signup(
    email,
    password,
    fullname,
    accountType,
    gender
  );
  if (registerResponse.hasError) {
    return res.status(401).json({
      auth: false,
      response: {},
      error: registerResponse.message
    });
  }
  const token = res.locals.token || res.locals.newtoken;
  registerResponse.token = token;
  return res.status(200).json({
    auth: true,
    response: registerResponse,
    error: ""
  });
}
module.exports = registerUser;
