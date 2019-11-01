const notice = require("./models/notices");
const utils = require("../utils");
module.exports = {
  model : notice,
  add: new_notice,
  getAll: get_notice
};

async function get_notice(length) {
  try {
    const response = { hasError: false, message: "" };
    if (length) {
      const noticesListLength = await notice
        .find({})
        .limit(length)
        .sort("-publishDate");
      response.hasError = false;
      response.message = noticesListLength;
      return response;
    }
    const noticesLis = await notice.find({}).sort("-publishDate");
    response.hasError = false;
    response.message = noticesLis;
    return response;
  } catch (error) {
    const response = { hasError: false, message: "" };
    response.hasError = true;
    response.message = error.toString();
    return response;
  }
}
async function new_notice({
  autor,
  title,
  redact,
  bsImage,
  publishDate,
  images
}) {
  try {
    const response = { hasError: false, message: "" };
    const redacted = redact;
    const baseImage = bsImage;
    const imagesNotice = images;
    await new notice({
      autor,
      title,
      redacted,
      baseImage,
      publishDate,
      imagesNotice: imagesNotice
    }).save();
    response.hasError = false;
    response.message = utils.keyword.english.success;
    return response;
  } catch (error) {
    const response = { hasError: false, message: "" };
    response.hasError = true;
    response.message = utils.keyword.english.dbProblemRegisterNotice;
    return response;
  }
}
