const needAreParent = require("./parent_required");
const needAreAdmin = require("./admin_required");
const valid = require("./checkvalidation");
module.exports = {
    valid,
    needAreAdmin,
    needAreParent,
}