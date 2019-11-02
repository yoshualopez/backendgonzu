const iNeed = require("../complements");

async function noticeGET(req, res) {
  var countNotices = req.body.countNotices || req.params.id;
  const new_token_id = res.locals.newtoken ? res.locals.newtoken : [];
  if (countNotices != undefined) {
    countNotices = new Number(countNotices);
    const noticesListLength = await iNeed.databaseNotices.getAll(countNotices);
    if (!noticesListLength.hasError) {
      return res.status(200).json({
        error: false,
        auth: true,
        response: noticesListLength.message,
        token: new_token_id
      });
    }
  }
  const noticesList = await iNeed.databaseNotices.getAll(10);
  if (!noticesList.hasError) {
    return res.status(200).json({
      error: false,
      auth: true,
      response: noticesList.message,
      token: new_token_id
    });
  }
  return res.status(200).json({
    error: false,
    auth: true,
    response: iNeed.log.english.noticeNothing,
    token: new_token_id
  });
}

async function noticeGETByID(req, res) {
  var id = req.body.countNotices || req.params.id;
  const notice = await iNeed.databaseNotices.notice(id);
  if (notice.hasError) {
    return res.status(500).json({
      error: true,
      auth: true,
      response: notice.message,
      token: ""
    });
  }
  return res.status(200).json({
    error: false,
    auth: true,
    response: notice.message,
    token: ""
  });
}
module.exports = {
  noticeGET,
  noticeGETByID
};
