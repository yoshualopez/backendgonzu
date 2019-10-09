const User = require("./models/user");
const admin = require("./models/admins");
const teacher = require("./models/teachers"); 

module.exports = {
    signin,
    signup,
    signupcomplete,
    removeById,
};

async function signin({email,password}){
    const response = { 
        id : null,
        email : null,
        lastjob : null,
        fullname : null,
        isAdmin : null,
        isTeacher : null,
        adminType : null,
        teacherType: null,
        errorMessage : null,
        permissions : [],
        token : null,
    }
    const user = await User.findOne({email});
    if(!user) {
        response.errorMessage = "Email doesn't exist.";
        return response;
    }
    response.id = user._id;
    response.email = user.email;
    response.fullname = user.fullname;
    response.isAdmin = user.isAdmin;
    response.lastjob = user.lastjob;
    response.adminType = user.adminType;
    response.isTeacher = user.isTeacher;
    response.teacherType = user.teacherType;
    response.permissions = user.permissions;
    
    const validPassword = await user.comparePassword(password, user.password);
    if (!validPassword) {
        response.errorMessage = "Wrong Password.";
        return response;
    }
    return response;
}

async function signup({
    email,
    password,
    fullname,
    isAdmin,
    isTeacher,
    permissions,
}){
    const response = {
        id : null,
        isAdmin : null,
        isTeacher : null,
        permissions : {},
        errorMessage : null,
    };
    try {
        const alreadyEmail = await User.findOne({ email });
        const alreadyFullname = await User.findOne({ fullname });
        if(alreadyEmail != null){
            throw "alreadyEmail";
        }
        if(alreadyFullname != null){
            throw "alreadyFullname";
        }
        try {
            const user = new User({
                email,
                password,
                fullname,
                isAdmin,
                isTeacher,
                permissions,
            });
            user.password = await user.encryptPassword(password);
            await user.save();
            response.id = user._id;
            response.isAdmin = user.isAdmin;
            response.isTeacher = user.isTeacher;
            response.permissions = user.permissions;

            return response;
        } catch (error) {
            response.errorMessage = "There was a problem registering your user";
            return response;
        }
    } catch (error) {
        if(error === "alreadyEmail"){
            response.errorMessage = "Email already exist";
            return response;
        }
        if(error === "alreadyFullname"){
            response.errorMessage = "Person already exist";
            return response;
        }
        response.errorMessage = "There was a problem validity register";
        return response;
    }
}
async function signupcomplete({
    id,
    type,
    charge,
    course,
}){
    const reponse = {
        errorMessage : null,
        admin : {},
        teacher : {},
    };
    try {
        const user = await User.findById({_id : id});
        if(user){
            var newResponse = {
                admin : {},
                teacher : {},
                errorMessage : null
            }
            if(!user.isAdmin && !user.isTeacher){
                newResponse.errorMessage = "Undefined type account";
                return newResponse;
            }
            if(user.isAdmin){
                const getType = type || "";
                const _idResultAdmin = await admin.generate({
                    type : getType,
                });
                await User.findOneAndUpdate({_id : user._id},{adminType : _idResultAdmin._id},{new: true})
                newResponse.admin = _idResultAdmin;
                return newResponse;
            }

            const getCourse = course || "";
            const getCharge = charge || "";
            const _idResultTeacher = await teacher.generate({
                charge : getCharge,
                tutor : {
                    course : getCourse
                }
            });
            await User.findOneAndUpdate({_id : user._id},{teacherType : _idResultTeacher._id},{new: true})
            newResponse.teacher = _idResultTeacher;
            return newResponse;
        
        }
        reponse.errorMessage = "Error finding user, please try again";
        return reponse;
    } catch(error) {
        console.log(error);
        reponse.errorMessage = error;
        return response;
    }
}
async function removeById({id}){
    const response = {
        errorMessage : null,
    }
    try {
        await User.findOneAndDelete({_id : id});
        return response;
    } catch (error) {
        response.errorMessage = "There was a problem remove user";
        return response;
    }
}