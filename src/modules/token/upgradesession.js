const jwt = require("jsonwebtoken");
module.exports = upgradesession;
async function upgradesession(req, res, next){
    if(res.locals.neednewtoken){
        const _id = res.locals.tokenid;
        const expired = 60 * 60 * 24;
        const token = jwt.sign({id: _id},process.env.SECRETTOKEN, { expiresIn: expired});
        res.locals.newtoken = token;
        return next();
    }
    return next();
}