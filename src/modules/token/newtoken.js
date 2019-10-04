const jwt = require("jsonwebtoken");
module.exports = (_id) => {
    const expired = 60 * 60 * 24;
    const token = jwt.sign({id: _id},process.env.SECRETTOKEN, { expiresIn: expired});
    return token;
}