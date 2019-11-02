const iNeed = require("../complements");

async function noticePOST(req, res) {
  const new_token_id = res.locals.newtoken ? res.locals.newtoken : [];
  const autor = req.body.autor;
  const title = req.body.title;
  const redact = req.body.redact;
  const bsImage = req.body.bsImage;
  const publishDate = req.body.published;
  const images = req.body.images || [];
  const notice = await iNeed.databaseNotices.add({
    autor,
    title,
    redact,
    bsImage,
    publishDate,
    images
  });
  if (notice.hasError) {
    return res.status(200).json({ 
      error: notice.message,
      auth : false, 
      response: "", 
      token: new_token_id });
  }
  return res.status(200).json({ 
    error: "", 
    auth : true,
    response: notice.message, 
    token: new_token_id });
}

module.exports = noticePOST;
