const iNeed = require("../complements");

async function noticeGET(req, res) {
  var countNotices = req.body.countNotices || req.params.id;
  const new_token_id = res.locals.newtoken ? res.locals.newtoken : [];
  if (countNotices != undefined) {
    countNotices = new Number(countNotices);
    const noticesListLength = await iNeed.databaseNotices.getAll(countNotices);
    if (!noticesListLength.hasError) {
      return res
        .status(200)
        .json({ response: noticesListLength.message, newtoken: new_token_id });
    }
  }
  const noticesList = await iNeed.databaseNotices.getAll(10);
  if (!noticesList.hasError) {
    return res
      .status(200)
      .json({ response: noticesList.message, newtoken: new_token_id });
  }
  return res.status(200).json({
    response: iNeed.log.english.noticeNothing,
    newtoken: new_token_id
  });
}
module.exports = noticeGET;