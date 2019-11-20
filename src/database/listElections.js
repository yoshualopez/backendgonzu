const User = require("./models/user");
const Vote = require("./models/vote");
const ListElection = require("./models/listElections");
const utils = require("../utils");

module.exports = {
  model: Vote,
  postCampaign,
  getCampaign
};

//recive the campaing elections structured
// => campaingelections
async function postCampaign(req, res) {
  try {
    const response = { hasError: false, data: {} };
    const { electionYear, status, lists } = req.body;
    const campaign = { electionYear: 0, status: "", lists: [] };
    campaign.electionYear = electionYear;
    campaign.status = status;
    campaign.lists = lists;

    const campaingStagin = new ListElection(campaign);
    const campaingSaved = await campaingStagin.save();
    response.hasError = false;
    response.data = campaingSaved;
    res.status(200).json({ auth: true, error: "", response: campaingSaved });
    return response;
  } catch (error) {
    const response = { hasError: false, data: {} };
    response.hasError = true;
    response.data = utils.keyword.spanish.dbProblemRegister;
    res.status(200).json({ auth: false, error: response.data, response: {} });
    return response;
  }
}
async function getCampaign(req, res) {
  let campaign = await ListElection.find({});
  campaign = campaign.map(function(list) {
    list.votes[0] = list.votes.length;
    return list;
  });
  res.status(200).json({ auth: true, error: "", response: campaign });
}
