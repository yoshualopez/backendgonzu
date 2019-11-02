const jwt = require("jsonwebtoken");
module.exports = verifiToken;
async function verifiToken(req, res, next) {
  try {
    const token = req.headers["x-access-token"];
    if (token.toString() === "null") {
      return res.status(401).send({
        auth: false,
        error: "No token provided",
        response: ""
      });
    }
    const decoded = jwt.verify(token, process.env.SECRETTOKEN);
    const remained = decoded.exp * 1000 - Date.now();
    const minutes = Math.round(remained / 1000 / 60);
    res.locals.neednewtoken = false;
    res.locals.token = token;
    res.locals.tokenid = decoded.id;
    console.log(token);
    if (minutes <= 120) {
      res.locals.neednewtoken = true;
    }
    return next();
  } catch (error) {
    if (error.name == "TokenExpiredError") {
      return res.status(401).send({ auth: false, error: error.message, response: "" });
    }
    if (error.name == "JsonWebTokenError") {
      return res.status(401).send({ auth: false, error: error.message, response: "" });
    }
    return res.status(401).send({ auth: false, error: "Token Error", response: "" });
  }
}
