// import bcrypt from 'bcryptjs';
// import db from '../models/index';
// import { where } from 'sequelize';
// import { raw } from 'body-parser';


// const salt = bcrypt.genSaltSync(10);

// let createNewUser = async (data) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             let hashPasswordFromBcrypt = await hashUserPassword(data.password);
//             await db.User.create({
//                 email: data.email,
//                 password: hashPasswordFromBcrypt,
//                 firstName: data.firstName,
//                 lastName: data.lastName,
//                 address: data.address,
//                 phonenumber: data.phonenumber,
//                 gender: data.gender === '1' ? true : false,
//                 roleId: data.roleId
//             })
//             resolve("okee create new user success");
//         } catch (e) {
//             reject(e);
//         }
//     })
// }
// let hashUserPassword = (password) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             let hashPassword = await bcrypt.hashSync(password, salt);
//             resolve(hashPassword);
//         } catch (e) {
//             reject(e);
//         }
//     })
// }
// let getAllUser = () => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             let users = db.User.findAll({
//                 raw: true,
//             });
//             resolve(users);
//         } catch (e) {
//             reject(e);
//         }
//     })
// }
// let getUserInforById = async (userId) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             let user = await db.User.findOne({
//                 where: { id: userId },
//                 raw: true,
//             });
//             if (user) {
//                 resolve(user);
//             } else {
//                 resolve({});
//             }
//         } catch (e) {
//             reject(e);
//         }
//     })
// }
// let updateUserData = async (data) => {
//     // console.log("code da chay toi day");
//     // console.log(data);
//     return new Promise(async (resolve, reject) => {
//         try {
//             let user = await db.User.findOne({
//                 where: { id: data.id }
//             });
//             //  console.log(user);
//             if (user) {
//                 user.firstName = data.firstName;
//                 user.lastName = data.lastName;
//                 user.address = data.address;
//                 await user.save();
//                 let allUsers = await db.User.findAll();
//                 resolve(allUsers);
//             } else {
//                 resolve();
//             }
//         } catch (error) {
//             reject(error);
//         }
//     })

// }
// let deleteUserById = async (userId) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             let user = await db.User.findOne({
//                 where: { id: userId },
//                 raw: false
//             });
//             if (user) {
//                 await user.destroy();
//             }
//             resolve();// return; tuong duong
//         } catch (error) {
//             reject(error);
//         }
//     })
// }
// module.exports = {
//     createNewUser: createNewUser,
//     getAllUser: getAllUser,
//     getUserInforById: getUserInforById,
//     updateUserData: updateUserData,
//     deleteUserById: deleteUserById,
// }