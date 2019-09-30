const notice = require("./models/notices");
module.exports = {
    add : new_notice,
    getAll : get_notice,
};

async function get_notice(length){
    try {
        if(length) {
            const returnedValueLength = await notice.find({}).limit(length).sort("-publishDate");
            return ["success",returnedValueLength];
        }
        const returnedValue = await notice.find({}).sort("-publishDate");
        return ["success",returnedValue];
    } catch (error) {
        if(error) return ["error",error];
    }
}
async function new_notice({autor,title,redact,bsImage,publishDate,images}){
    try {
        const redacted = redact;
        const baseImage = bsImage;
        const imagesNotice = images;
        await new notice({
            autor,
            title,
            redacted,
            baseImage,
            publishDate,
            imagesNotice : imagesNotice,
        }).save();
        return ["success",0];
    } catch (error) {
        if(error)  return ["error","Error save notice, please try again."];
    }
}