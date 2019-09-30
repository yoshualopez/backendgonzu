const jwt = require("jsonwebtoken");
module.exports = verifiToken;
async function verifiToken(req, res, next){
    const token = req.headers['x-access-token'];
    if(!token){
        return res.status(401).send({ auth: false, message: 'No token provided' });
    }
    const decoded = await jwt.verify(token,process.env.SECRETTOKEN);
    req.userId = decoded.id;
    next();
}