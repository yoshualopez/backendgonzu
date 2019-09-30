const jwt = require("jsonwebtoken");
module.exports = (_id) => {
    const token = jwt.sign({id: _id},process.env.SECRETTOKEN, { expiresIn: 60 * 60 * 24});
    return token;
}