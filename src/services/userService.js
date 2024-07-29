import { where } from 'sequelize';
import db from '../models/index';
import bcrypt from 'bcryptjs';
import { raw } from 'body-parser';

const salt = bcrypt.genSaltSync(10);

let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let isExits = await checkUserEmail(email);
            if (isExits) {
                // 1.user alreadly exits
                // 2.compare password

                // bcrypt.compareSync("B4c0/\/", hash); // true
                // bcrypt.compareSync("not_bacon", hash); // false
                let user = await db.User.findOne({
                    attributes: ['id', 'email', 'roleId', 'password', 'firstName', 'lastName'],
                    where: { email: email },
                    raw: true,

                })
                if (user) {
                    // 2.compare password
                    let check = await bcrypt.compareSync(password, user.password); // false
                    if (check) {
                        userData.errCode = 0;
                        userData.errMessa = `okee`;
                        delete user.password;
                        userData.user = user;
                    } else {
                        userData.errCode = 3;
                        userData.errMessa = `wrong password`;
                    }
                } else {
                    userData.errCode = 2;
                    userData.errMessa = `User's not found`;
                }

            } else {
                //return error
                userData.errCode = 1;
                userData.errMessa = `Your's email isn't exits in your system. Plz try other email!`;

            }
            resolve(userData);
        } catch (error) {
            reject(error);
        }
    })
}

let checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: userEmail }
            })
            if (user) {
                resolve(true);
            } else {
                resolve(false);
            }
        } catch (error) {
            reject(error);
        }
    })
}

let getAllUsers = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = '';
            if (userId === 'ALL') {
                users = await db.User.findAll({
                    attributes: {
                        exclude: ['password']
                    }
                })
            } else if (userId && userId !== 'ALL') {
                users = await db.User.findOne({
                    where: { id: userId },
                    attributes: {
                        exclude: ['password']
                    }
                })
            }
            resolve(users);
        } catch (e) {
            reject(e);
        }
    })
}

let createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {

            //check email da ton tai
            let check = await checkUserEmail(data.email);
            if (check === true) {
                resolve({
                    errCode: 1,
                    errMessa: "Your email is already in use"
                })
            } else {
                let hashPasswordFromBcrypt = await hashUserPassword(data.password);
                await db.User.create({
                    email: data.email,
                    password: hashPasswordFromBcrypt,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address,
                    phoneNumber: data.phoneNumber,
                    gender: data.gender,
                    roleId: data.roleId,
                    positionId: data.positionId,
                    image: data.avatar
                })
                resolve({
                    errCode: 0,
                    errMessa: 'okee'
                });
            }

        } catch (e) {
            reject(e);
        }
    })
}

let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (e) {
            reject(e);
        }
    })
}
let deleteUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {

            let user = await db.User.findOne({
                where: { id: userId },
                raw: false
            })
            if (!user) {
                resolve({
                    errCode: 2,
                    errMessa: `The user isn't exits`
                })
            } else {
                await user.destroy();
                resolve({
                    errCode: 0,
                    errMessa: `the user is deleted`
                })
            }


        } catch (e) {
            reject(e);
        }
    })
}

let updateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id || !data.roleId || !data.positionId || !data.gender) {
                resolve({
                    errCode: 1,
                    errMessa: "Missing required parameters",
                })
            } else {
                let user = await db.User.findOne({
                    where: { id: data.id },
                    raw: false
                });
                //  console.log(user);
                if (user) {
                    user.firstName = data.firstName;
                    user.lastName = data.lastName;
                    user.address = data.address;
                    user.roleId = data.roleId;
                    user.positionId = data.positionId;
                    user.gender = data.gender;
                    user.phoneNumber = data.phoneNumber;
                    if (data.avatar) {
                        user.image = data.avatar;
                    }
                    await user.save();
                    resolve({
                        errCode: 0,
                        errMessa: "Update the user success!"
                    })
                } else {
                    resolve({
                        errCode: 2,
                        errMessa: `The user isn't exits`
                    });
                }
            }

        } catch (e) {
            reject(e);
        }
    })
}
let getAllCodeservice = (typeInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!typeInput) {
                resolve({
                    errCode: 1,
                    errMessa: "Missing Requires paramenter"
                });
            } else {
                let res = {};
                let allcode = await db.Allcode.findAll({
                    where: { type: typeInput }
                });
                res.errCode = 0;
                res.data = allcode;
                resolve(res);
            }


        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    handleUserLogin: handleUserLogin,
    checkUserEmail: checkUserEmail,
    getAllUsers: getAllUsers,
    createNewUser: createNewUser,
    hashUserPassword: hashUserPassword,
    deleteUser: deleteUser,
    updateUserData: updateUserData,
    getAllCodeservice: getAllCodeservice,

}