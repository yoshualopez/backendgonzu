const db = require("./database")
const tokens = require("./token");
module.exports = {
    fatherSignIn,
    fatherSignUp,

};
function fatherSignIn(req,res,next){
    const email = req.body.email;
    const password = req.body.password;
    const isLogged = db.padres.signin({email,password});
    if(isLogged[0] === "success"){
        const token = tokens.newToken(isLogged[1]);
        return res.status(200).json({auth : true,token});
    }
    return res.status(401).json({auth : false,token : null});
}
function fatherSignUp(req,res,next){
    const email = req.body.email;
    const password = req.body.password;
    const fullname = req.body.fullname;
    const isLogged = db.padres.signup({email,password,fullname});
    if(isLogged[0] === "success"){
        const token = tokens.newToken(isLogged[1]);
        return res.status(200).json({auth : true,token});
    }
    return res.status(401).json({auth : false,token : null});
}