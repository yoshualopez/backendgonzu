const iNeed = require("../complements");

async function addChildrens(req,res,next){
  const id = req.params.id || req.body.id;
  const childrens = req.body.childrens || [];

  const responseChildrens = await iNeed.databaseUser.addChildren(id,childrens);
  if(responseChildrens.hasError){
    return res.status(401).json({
      auth: false,
      response: {},
      error: responseChildrens.message
    });
  }
  return res.status(200).json({
    auth: true,
    response: responseChildrens.childrensArray,
    error: ""
  });
}

module.exports = addChildrens;
