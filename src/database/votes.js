const Vote = require("./models/vote");
const ListElection = require("./models/listElections");
const utils = require("../utils");

module.exports = {
  model: Vote,
  vote
};

async function vote(req, res) {
  try {
    const { campaign, user, listSelect } = req.body;
    const ballot = {
      identicard: "",
      enrollmentcode: "",
      courseSection: "",
      course: "",
      parallel: "",
      listSelect: ""
    };
    ballot.identicard = user.firstlastname + " " + user.secondlastname + " " + user.firstname + " " + user.secondname;
    ballot.enrollmentcode = user.enrollmentcode;
    ballot.courseSection = user.courseSection;
    ballot.course = user.course;
    ballot.parallel = user.parallel;
    ballot.listSelect = listSelect.coverName;
    const response = { hasError: false, data: {} };
    const ballotStagin = new Vote(ballot);
    const ballotSaved = await ballotStagin.save();
    const list = await ListElection.findById(campaign._id);
    if (!list) {
      return res.status(200).json({
        auth: false,
        error: "Campaing not found",
        response: {}
      });
    }
    if (list.status == "closed" || list.status == "open") {
      return res
        .status(200)
        .json({ auth: false, error: "Campaign not listening", response: {} });
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
