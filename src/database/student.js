const Student = require("./models/student");
const utils = require("../utils");

module.exports = {
    model: Student,
    findByStudent
};

//recive the campaing elections structured
// => campaingelections
async function findByStudent(req, res) {
    try {
        const response = { hasError: false, data: {} };
        const { data } = req.body;
        if (req.params.filter == "enrollment") {
            const student = await Student.find({ matricula: data });
            return res.status(200).json({ auth: true, error: "", response: student });
        }
        if (req.params.filter == "ci") {
            const studentR = await Student.find({ ci : data});
        console.log(data,)
            return res.status(200).json({ auth: true, error: "", response: studentR });
        }
        response.hasError = false;
        response.data = students;
        res.status(200).json({ auth: true, error: "", response: students });
        return response;
    } catch (error) {
        const response = { hasError: false, data: {} };
        response.hasError = true;
        response.data = utils.keyword.spanish.dbUserNotFound;
        res.status(200).json({ auth: false, error: response.data, response: {} });
        return response;
    }
}
async function getCampaign(req, res) {
    const campaign = await ListElection.find({});
    res.status(200).json({ auth: true, error: "", response: campaign });
}
