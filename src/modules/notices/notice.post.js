const iNeed = require("../complements");

async function noticePOST(req, res) {
  const new_token_id = res.locals.newtoken ? res.locals.newtoken : [];
  const autor = req.body.autor;
  const title = req.body.title;
  const redact = req.body.redact;
  const bsImage = req.body.bsImage;
  const publishDate = req.body.published;
  const images = req.body.images || [];
  const isFinished = await iNeed.databaseNotices.add({
    autor,
    title,
    redact,
    bsImage,
    publishDate,
    images
  });
  if (isFinished[0] === "success") {
    return res
      .status(200)
      .json({ error: false, message: isFinished[1], newtoken: new_token_id });
  }
  return res
    .status(200)
    .json({ error: true, message: isFinished[1], newtoken: new_token_id });
}

module.exports = noticePOST;
