const db = require("./database");
const tokens = require("./token");
module.exports = {
    fatherSignIn,
    fatherSignUp,
    getAllNotices,
    userLogin,
    userRegister,
    userCompleteRegister,
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
        return res.status(200).json({auth : true,token,id : isLogged[1],errorPhrase : null});
    }
    if(isLogged[0] === "error"){
        return res.status(200).json({auth : false,token : null,id : null,errorPhrase : isLogged[1]});
    }
    return res.status(401).json({auth : false,token : null,id : null,errorPhrase : "Error undefined"});
}
async function fatherSignUp(req,res){
    const email = req.body.email;
    const password = req.body.password;
    const fullname = req.body.fullname;
    const isLogged = await db.padres.signup({email,password,fullname});
    if(isLogged[0] === "success"){
        const token = tokens.newToken(isLogged[1]);
        return res.status(200).json({auth : true,token,id : isLogged[1],errorPhrase : null});
    }
    if(isLogged[0] === "error"){
        return res.status(200).json({auth : false,token : null,id : null,errorPhrase : isLogged[1]});
    }
    return res.status(401).json({auth : false,token : null,id : null,errorPhrase : "Error undefined"});
}
async function userLogin(req,res){
    console.log(req.body);
    const email = req.body.email;
    const password = req.body.password;
    const isLogged = await db.user.signin({email : email,password : password});
    if(isLogged.errorMessage !== null){
        return res.status(401).json({auth : false,response : {},errorPhrase : isLogged.errorMessage});
    }
    const token = tokens.newToken(isLogged.id);
    isLogged.token = token;
    return res.status(200).json({auth : true,response : isLogged,errorPhrase : null});
}
async function userRegister(req,res){
    const email = req.body.email;
    const password = req.body.password;
    const fullname = req.body.fullname;
    const isAdmin = req.body.isAdmin || false;
    const isTeacher = req.body.isTeacher || false;
    const permissions = req.body.permissions || {};

    const isLogged = await db.user.signup({
        email : email, password : password,
        fullname : fullname, isAdmin : isAdmin,
        isTeacher : isTeacher, permissions : permissions,
    });
    if(isLogged.errorMessage !== null){
        return res.status(401).json({auth : false,response : {},errorPhrase : isLogged.errorMessage});
    }
    const token = tokens.newToken(isLogged.id);
    isLogged.token = token;
    return res.status(200).json({auth : true,response : isLogged,errorPhrase : null});
}
async function userCompleteRegister(req,res,next){
    const id = req.body._id;
    const charge = req.body.charge
    const course = req.body.course;
    const type = req.body.type;

    const isLogged = await db.user.signupcomplete({
        id : id, charge : charge,
        course : course, type : type,
    });
    console.log(isLogged)
    if(isLogged.errorMessage !== null){
        return res.status(401).json({auth : false,response : {},errorPhrase : isLogged.errorMessage});
    }
    return res.status(200).json({auth : true,response : isLogged,errorPhrase : null});
}