const User = require("./models/user");
const Children = require("./models/childrens");
const utils = require("../utils");

module.exports = {
  model: User,
  signin,
  signup,
  addChildren,
  signupcomplete,
  removeById,
  getUserById
};

async function getUserById(id) {
  try {
    const response = { hasError: false, data: {} };
    const user = await User.findById({ _id: id });
    response.hasError = false;
    response.data = user;
    return response;
  } catch (error) {
    const response = { hasError: false, data: {} };
    response.hasError = true;
    response.data = utils.keyword.english.dbUserNotFound;
    return response;
  }
}

async function signin(email, password) {
  try {
    const response = {
      id: "",
      fullname: "",
      photoURL: "",
      email: "",
      permissions: [],
      accountType: [],
      gender: "",
      teacherAssignature: "",
      teacherTutor: "",
      childrens: [],
      hasError: false,
      message: ""
    };
    const user = await User.findOne({ email: email });
    if (!user) {
      response.hasError = true;
      response.message = utils.keyword.english.emailDontExist;
      return response;
    }
    const validPassword = await user.comparePassword(password, user.password);
    if (!validPassword) {
      response.hasError = true;
      response.message = utils.keyword.english.passwordWrong;
      return response;
    }
    response.id = user._id;
    response.fullname = user.fullname;
    response.photoURL = user.photoURL;
    response.email = user.email;
    response.permissions = user.permissions;
    response.accountType = user.accountType;
    response.gender = user.gender;
    response.teacherAssignature = user.teacherAssignature;
    response.teacherTutor = user.teacherTutor;
    //IN THIS FIELD RESPONSE WITH ARRAY OF ID OF THE CHILDREN
    //I NEED TO RESOLVE THIS, I WANT TO RETURN ALL DATA OF CHILDRENS
    response.childrens = user.childrens;

    return response;
  } catch (error) {
    const response = { hasError: false, message: "" };
    response.hasError = true;
    response.message = error.toString();
    return response;
  }
}
async function signup(email, password, fullname, accountType, gender) {
  try {
    const response = {
      id: "",
      accountType: "",
      email: "",
      fullname: "",
      hasError: false,
      message: ""
    };
    const alreadyEmail = await User.findOne({ email });
    if (alreadyEmail != null) {
      throw "alreadyEmail";
    }
    const user = new User({
      email: email,
      password: password,
      fullname: fullname,
      accountType: accountType,
      gender: gender
    });
    user.password = await user.encryptPassword(password);
    await user.save();
    response.id = user._id;
    response.email = user.email;
    response.fullname = user.fullname;
    response.accountType = user.accountType;

    return response;
  } catch (error) {
    const response = {
      hasError: false,
      message: ""
    };
    if (error === "alreadyEmail") {
      response.hasError = true;
      response.message = utils.keyword.english.emailAlready;
      return response;
    }
    response.hasError = true;
    response.message = utils.keyword.english.dbProblemRegisterUser;
    return response;
  }
}
async function signupcomplete(id, teacherAssignature, teacherTutor, permissions) {
  try {
    const response = {
      teacherAssignature: "",
      teacherTutor: "",
      permissions: [],
      hasError: false,
      message: ""
    };
    if (permissions.length <= 0) {
      response.hasError = true;
      response.message = utils.keyword.english.dbAccountPermissionsUnxpected;
      return response;
    }
    const user = await User.findById({ _id: id });
    if (!user) {
      response.hasError = true;
      response.message = utils.keyword.english.dbProblemRegisterUser;
      return response;
    }
    await User.findOneAndUpdate(
      { _id: user._id },
      {
        teacherAssignature: teacherAssignature,
        teacherTutor: teacherTutor,
        permissions: permissions
      },
      { new: true }
    );
    response.permissions = permissions;
    response.teacherAssignature = teacherAssignature;
    response.teacherTutor = teacherTutor;
    return response;
  } catch (error) {
    const response = { hasError: false, message: "" };
    response.hasError = true;
    response.message = utils.keyword.english.dbProblemRegisterUser;
    return response;
  }
}

async function addChildren(parentId, childrensArray) {
  try {
    const response = { childrensArray: [], hasError: false, message: "" };
    const childrensId = [];
    childrensArray.map(async children => {
      const childrenModel = new Children({
        childrenGender: children.childrenGender,
        childrenFullname: children.childrenFullname,
        childrenAge: children.childrenAge,
        childrenCourse: children.childrenCourse,
        parent: parentId
      });
      await childrenModel.save();
      return childrensId.push(childrenModel._id);
    });
    const user = await User.findById({ _id: parentId });
    await User.findOneAndUpdate({ _id: user._id }, { childrens: childrensId }, { new: true });
    console.log(user._id, " => ", childrensId);
    response.hasError = false;
    response.childrensArray = childrensArray;
    return response;
  } catch (error) {
    const response = { childrensArray: [], hasError: false, message: "" };
    response.hasError = true;
    response.message = utils.keyword.english.dbProblemRegister;
    return response;
  }
}

async function removeById({ id }) {
  try {
    const response = {
      hasError: false,
      message: ""
    };
    await User.findOneAndDelete({ _id: id });
    response.hasError = false;
    response.message = utils.keyword.english.dbRemoveUser;
    return response;
  } catch (error) {
    const response = {
      hasError: false,
      message: ""
    };
    response.hasError = true;
    response.message = utils.keyword.english.dbProblemRemoveUser;
    return response;
  }
}
