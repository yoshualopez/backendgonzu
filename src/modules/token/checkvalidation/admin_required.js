const jwt = require("jsonwebtoken");
const admin = require("../../database/models/user");
module.exports = async function needAreAdmin(req,res,next){
    try {
        const token = req.headers['x-access-token'];
        if(!token){
            return res.status(401).send({ auth: false, message: 'No token provided' });
        }
        const decoded = jwt.verify(token,process.env.SECRETTOKEN);
        console.log("CHECKER => ",decoded);
        const dontAreAdmin = await admin.findById({_id : decoded.id});
        if(!dontAreAdmin){
            return res.status(401).send({ auth : false,message : ""})
        }
        const remained = (decoded.exp * 1000) - Date.now()
        const minutes = Math.round((remained / 1000) / 60);
        res.locals.neednewtoken = false;
        if(minutes <= 120){
            res.locals.neednewtoken = true;
            res.locals.tokenid = decoded.id;
        }
        return next();
    } catch (error) {
        if(error.name == "TokenExpiredError"){
            return res.status(401).send({ auth: false, message: 'Token Expired' });
        }
        if(error.name == "JsonWebTokenError"){
            return res.status(401).send({ auth: false, message: 'Token Invalid or malformed'});
        }
        console.log(error);
        return res.status(401).send({ auth: false, message: 'Token Error' });
    }
}