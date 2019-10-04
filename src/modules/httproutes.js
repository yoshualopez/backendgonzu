const db = require("./database");
db.notice.getAll
const tokens = require("./token");
module.exports = {
    fatherSignIn,
    fatherSignUp,
    adminSignIn,
    adminSignUp,
    getAllNotices,
};
async function getAllNotices(req,res,next){
    var countNotices = req.body.length || req.params.id;
    const new_token_id = res.locals.newtoken ? res.locals.newtoken : [];
    if(countNotices != undefined){
        countNotices = new Number(countNotices);
        const noticesLength = await db.notice.getAll(countNotices);
        if(noticesLength[0] === "success"){
            return res.status(200).json({response : noticesLength[1],newtoken : new_token_id});
        }
        return next();
    }
    const notices = await db.notice.getAll(10);
    if(notices[0] === "success"){
        return res.status(200).json({response : notices[1],newtoken : new_token_id});
    }
    return next();
}
async function fatherSignIn(req,res){
    const email = req.body.email;
    const password = req.body.password;
    const isLogged = await db.padres.signin({email,password});
    if(isLogged[0] === "success"){
        const token = tokens.newToken(isLogged[1]);
        return res.status(200).json({auth : true,token,id : isLogged[1]});
    }
    return res.status(401).json({auth : false,token : null});
}
async function adminSignIn(req,res){
    const email = req.body.email;
    const password = req.body.password;
    const isLogged = await db.admin.signin({email,password});
    if(isLogged[0] === "success"){
        const token = tokens.newToken(isLogged[1]);
        return res.status(200).json({auth : true,token,id : isLogged[1]});
    }
    return res.status(401).json({auth : false,token : null});
}

async function fatherSignUp(req,res){
    const email = req.body.email;
    const password = req.body.password;
    const fullname = req.body.fullname;
    const isLogged = await db.padres.signup({email,password,fullname});
    if(isLogged[0] === "success"){
        const token = tokens.newToken(isLogged[1]);
        return res.status(200).json({auth : true,token,id : isLogged[1]});
    }
    return res.status(401).json({auth : false,token : null});
}
async function adminSignUp(req,res){
    const email = req.body.email;
    const password = req.body.password;
    const fullname = req.body.fullname;
    const isLogged = await db.admin.signup({email,password,fullname});
    if(isLogged[0] === "success"){
        const token = tokens.newToken(isLogged[1]);
        return res.status(200).json({auth : true,token,id : isLogged[1]});
    }
    return res.status(401).json({auth : false,token : null});
}