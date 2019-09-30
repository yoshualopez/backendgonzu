const express = require("express").Router;
const app = express();
const tokens = require("./token");
const db = require("./database");
const httpRoute = require("./httproutes");

const data = {
    data : [
        {
            title : "Hola mundo",
            autor : "Camilo Ponce",
            redactText : "Camilo ponce subio por un caminito y se callo",
            baseImage : "https://s.gravatar.com/avatar/a68cb0f927eafc449f4046ea3edc09a2?size=100&default=retro",
            publishDate : 1569379127623,
            images : [
                "https://s.gravatar.com/avatar/a68cb0f927eafc449f4046ea3edc09a2?size=100&default=retro",
                "https://s.gravatar.com/avatar/6c43616eef331e8ad08c7f90a51069a5?size=100&default=retro"
            ],
            _id : "1231_2121_w12dsa"
        },
        {
            title : "Hola mundo",
            autor : "Camilo Ponce",
            redactText : "Camilo ponce subio por un caminito y se callo",
            baseImage : "https://s.gravatar.com/avatar/a68cb0f927eafc449f4046ea3edc09a2?size=100&default=retro",
            publishDate : 1569379127623,
            images : [
                "https://s.gravatar.com/avatar/a68cb0f927eafc449f4046ea3edc09a2?size=100&default=retro",
                "https://s.gravatar.com/avatar/6c43616eef331e8ad08c7f90a51069a5?size=100&default=retro"
            ],
            _id : "1231_2121_w12dsa"
        },
        {
            title : "Hola mundo",
            autor : "Camilo Ponce",
            redactText : "Camilo ponce subio por un caminito y se callo",
            baseImage : "https://s.gravatar.com/avatar/a68cb0f927eafc449f4046ea3edc09a2?size=100&default=retro",
            publishDate : 1569379127623,
            images : [
                "https://s.gravatar.com/avatar/a68cb0f927eafc449f4046ea3edc09a2?size=100&default=retro",
                "https://s.gravatar.com/avatar/6c43616eef331e8ad08c7f90a51069a5?size=100&default=retro"
            ],
            _id : "1231_2121_w12dsa"
        },
        {
            title : "Hola mundo",
            autor : "Camilo Ponce",
            redactText : "Camilo ponce subio por un caminito y se callo",
            baseImage : "https://s.gravatar.com/avatar/a68cb0f927eafc449f4046ea3edc09a2?size=100&default=retro",
            publishDate : 1569379127623,
            images : [
                "https://s.gravatar.com/avatar/a68cb0f927eafc449f4046ea3edc09a2?size=100&default=retro",
                "https://s.gravatar.com/avatar/6c43616eef331e8ad08c7f90a51069a5?size=100&default=retro"
            ],
            _id : "1231_2121_w12dsa"
        }
    ]
};

app.route("/loggin/flia").post(httpRoute.fatherSignIn);
app.route("/loggin/teachers").post(httpRoute.adminSignIn);
app.route("/register/flia").post(httpRoute.fatherSignUp);
app.route("/register/teachers").post(httpRoute.adminSignUp);

app.route("/notices").get(httpRoute.getAllNotices,(req,res)=>{ return res.status(200).json({response : "Any notice."})});
app.route("/notices/:id").get(httpRoute.getAllNotices,(req,res)=>{ return res.status(200).json({response : "Any notice."})});

app.route("/notices/add").post(tokens.checkValidation,async (req,res) => {
    const autor = req.body.autor;
    const title = req.body.title;
    const redact = req.body.redact;
    const bsImage = req.body.bsImage;
    const publishDate = req.body.published;
    const images = req.body.images || [];
    const isFinished = await db.notice.add({autor,title,redact,bsImage,publishDate,images});
    if(isFinished[0] === "success"){
        return res.status(200).json({error : false,message : isFinished[1]});
    }
    return res.status(200).json({error : true, message : isFinished[1]})
})
app.route('/logout').post(tokens.checkValidation,(req, res) => { return res.status(200).json({ auth: false, token: null })});

app.route("/api/geting").get((req,res) =>{
    res.json(data).status(200);
});

module.exports = app;