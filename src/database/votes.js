const User = require("./models/user");
const Vote = require("./models/vote");
const ListElection = require("./models/listElections");
const utils = require("../utils");

module.exports = {
  model: Vote,
  vote
};

async function vote(req, res) {
  try {
    const { fullname, ci, age, course, listSelect } = req.body;
    const ballot = { fullname: "", ci: 0, age: 0, course: "", listSelect: "" };
    ballot.fullname = fullname;
    ballot.ci = ci;
    ballot.age = age;
    ballot.course = course;
    ballot.listSelect = listSelect;

    const response = { hasError: false, data: {} };
    const _ballot = new Vote(ballot);
    const ballotSaved = await _ballot.save();
    const list = await ListElection.findById(listSelect);

    if (list.status == "closed" || list.status == "open") {
      return res.status(200).json({ auth: false, error: "Campaign not listening", response: {} });
    }

    await list.updateOne({
      $push: {
        votes: ballotSaved._id
      }
    });
    response.hasError = false;
    response.data = ballotSaved;
    res.status(200).json({ auth: true, error: "", response: ballotSaved });
    return response;
  } catch (error) {
    const response = { hasError: false, data: {} };
    response.hasError = true;
    response.data = utils.keyword.spanish.dbProblemRegister;
    res.status(200).json({ auth: false, error: response.data, response: {} });
    return response;
  }
}
