module.exports = (app) => {
  //common middlewares
  require("./routes").routeGET(app);
  require("./routes").routeDELETE(app);
  require("./routes").routePOST(app);
  require("./routes").routePUT(app);

  require("./upload").docs(app);
  require("./upload").images(app);
};
