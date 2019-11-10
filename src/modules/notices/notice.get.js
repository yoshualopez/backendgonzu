const iNeed = require("../complements");

async function noticeGET(req, res) {
  var countNotices = req.body.countNotices || req.params.count;
  if (countNotices != undefined) {
    countNotices = new Number(countNotices);
    const noticesListLength = await iNeed.databaseNotices.getAll(countNotices);
    if (noticesListLength.hasError) {
      return res.status(200).json({
        error: noticesListLength.message,
        auth: false,
        response: {}
      });
    }
    return res.status(200).json({
      error: "",
      auth: true,
      response: noticesListLength.message
    });
  }
  const noticesList = await iNeed.databaseNotices.getAll(10);
  if (!noticesList.hasError) {
    return res.status(200).json({
      error: "",
      auth: true,
      response: noticesList.message
    });
  }
  return res.status(200).json({
    error: iNeed.log.english.noticeNothing,
    auth: false,
    response: {}
  });
}

async function noticeGETByID(req, res) {
  var id = req.body.countNotices || req.params.id;
  const notice = await iNeed.databaseNotices.notice(id);
  if (notice.hasError) {
    return res.status(500).json({
      error: true,
      auth: true,
      response: notice.message
    });
  }
  return res.status(200).json({
    error: false,
    auth: true,
    response: notice.message
  });
}
module.exports = {
  noticeGET,
  noticeGETByID
};
