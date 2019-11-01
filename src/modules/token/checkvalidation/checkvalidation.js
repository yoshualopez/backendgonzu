const jwt = require("jsonwebtoken");
module.exports = verifiToken;
async function verifiToken(req, res, next){
    try {
        const token = req.headers['x-access-token'];
        if(token.toString() === "null"){
            return res.status(401).send({ auth: false, message: 'No token provided' });
        }
        const decoded = jwt.verify(token,process.env.SECRETTOKEN);
        const remained = (decoded.exp * 1000) - Date.now()
        const minutes = Math.round((remained / 1000) / 60);
        res.locals.neednewtoken = false;
        // <=
        console.log(token);
        if(minutes <= 120){
            res.locals.neednewtoken = true;
            res.locals.tokenid = decoded.id;
        }
        return next();
    } catch (error) {
        if(error.name == "TokenExpiredError"){
            return res.status(401).send({ auth: false, message: error.message });
        }
        if(error.name == "JsonWebTokenError"){
            return res.status(401).send({ auth: false, message: error.message});
        }
        return res.status(401).send({ auth: false, message: 'Token Error' });
    }
}