const routeGET = require("./router.get");
const routeDELETE = require("./router.delete");
const routePOST = require("./router.post");
const routePUT = require("./router.put");

module.exports = (app)  ={
  routeGET,
  routeDELETE,
  routePOST,
  routePUT
};
