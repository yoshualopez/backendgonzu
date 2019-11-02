const iNeed = require("../complements");

async function loginUser(req, res) {
  const email = req.body.email;
  const password = req.body.password;
  console.log(req.body);
  const loginResponse = await iNeed.databaseUser.signin(email,password);
  if (loginResponse.hasError) {
    return res.status(200).json({ 
      auth: false, 
      response: "", 
      error: loginResponse.message
    });
  }
  const token = iNeed.newToken(loginResponse.id);
  loginResponse.token = token;
  return res.status(200).json({ 
    auth: true, 
    response: loginResponse, 
    error: "" });
}
module.exports = loginUser;