const DELETE = require("./notice.delete");
const GET = require("./notice.get");
const PUT = require("./notice.put");
const POST = require("./notice.post");
module.exports = {
  DELETE,
  GET : GET.noticeGET,
  GETById : GET.noticeGETByID,
  POST,
  PUT
};
