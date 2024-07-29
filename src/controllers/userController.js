import db from '../models/index';
import userService from "../services/userService"

let handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    // cac buoc xu li:
    // 1.check email exits
    // 2.compare password
    // 3.return userInfor
    //access_token: JWT
    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            message: "Missing input parameter!"
        })
    }
    let userData = await userService.handleUserLogin(email, password);


    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMessa,
        user: userData.user ? userData.user : {}
    })
}

let handleGetAllUsers = async (req, res) => {
    let id = req.query.id;
    if (!id) {
        return res.status(500).json({
            errCode: 1,
            errMessa: "Missing required parameters",
            users
        })
    }
    let users = await userService.getAllUsers(id);
    //console.log(users);
    return res.status(200).json({
        errCode: 0,
        errMessa: "okee",
        users
    })
}
let handleCreateNewUser = async (req, res) => {
    let message = await userService.createNewUser(req.body);
    return res.status(200).json(message);

}
let handleEditNewUser = async (req, res) => {
    let data = req.body;
    let message = await userService.updateUserData(data);
    return res.status(200).json(message);
}
let handleDeleteNewUser = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessa: "Missing required parameters",
        })
    } else {
        let message = await userService.deleteUser(req.body.id);
        return res.status(200).json(message);
    }

}
let getAllCode = async (req, res) => {
    try {
        let data = await userService.getAllCodeservice(req.query.type);
        return res.status(200).json(data);

    } catch (e) {
        console.log("Get all code err: ", e);
        return res.status(200).json({
            errCode: -1,
            errMessa: "Err from server",
        })
    }
}

module.exports = {
    handleLogin: handleLogin,
    handleGetAllUsers: handleGetAllUsers,
    handleCreateNewUser: handleCreateNewUser,
    handleEditNewUser: handleEditNewUser,
    handleDeleteNewUser: handleDeleteNewUser,
    getAllCode: getAllCode,

}