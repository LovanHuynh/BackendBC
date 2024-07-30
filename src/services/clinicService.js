
import { where } from 'sequelize';
import db from '../models/index';
import { raw } from 'body-parser';
let postCreateClinic = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.name || !data.image || !data.descriptionHTML || !data.descriptionMarkdown || !data.address) {
                resolve({
                    errCode: 1,
                    errMessa: "Missing requied Parameter!"

                })
            }
            else {
                await db.Clinic.create({
                    name: data.name,
                    address: data.address,
                    image: data.image,
                    descriptionHTML: data.descriptionHTML,
                    descriptionMarkdown: data.descriptionMarkdown
                })
                resolve({
                    errCode: 0,
                    errMessa: "create new specialty succes"
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

let getAllClinic = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Clinic.findAll();
            if (data && data.length > 0) {
                data.map(item => {
                    item.image = Buffer.from(item.image, 'base64').toString('binary');
                    return item;
                })

            }
            if (!data) data = [];
            resolve({
                errCode: 0,
                data: data
            })

        } catch (e) {
            reject(e);
        }
    })
}
let updateClinic = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id || !data.name || !data.image || !data.descriptionHTML || !data.descriptionMarkdown || !data.address) {
                resolve({
                    errCode: 1,
                    errMessa: "Missing requied Parameter!"

                })
            } else {
                let res = await db.Clinic.findOne({
                    where: { id: data.id },
                    raw: false
                });
                if (res) {
                    res.name = data.name;
                    res.image = data.image;
                    res.address = data.address;
                    res.descriptionHTML = data.descriptionHTML;
                    res.descriptionMarkdown = data.descriptionMarkdown;
                    await res.save();

                }
                resolve({
                    errCode: 0,
                    errMessa: 'okee'
                })
            }


        } catch (e) {
            reject(e);
        }
    })
}
let getDetailClinicById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id) {
                resolve({
                    errCode: 1,
                    errMessa: "Missing requied Parameter!"

                })
            } else {
                let data = await db.Clinic.findOne({
                    where: { id: id },
                    attributes: ['descriptionHTML', 'descriptionMarkdown', 'name', 'address'],
                    //raw: false
                });

                if (data) {
                    let doctorClinic = [];

                    doctorClinic = await db.DoctorInfor.findAll({
                        where: {
                            clinicId: id
                        },
                        attributes: ['doctorId'],
                    })


                    data.doctorClinic = doctorClinic;

                } else { data = {} };
                resolve({
                    errCode: 0,
                    errMessa: 'okee',
                    data

                })

            }
        } catch (e) {
            reject(e);
        }
    })
}
let createHandbook = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.name || !data.image || !data.descriptionHTML || !data.descriptionMarkdown) {
                resolve({
                    errCode: 1,
                    errMessa: "Missing requied Parameter!"

                })
            }
            else {
                await db.Handbook.create({
                    name: data.name,
                    address: data.address,
                    image: data.image,
                    descriptionHTML: data.descriptionHTML,
                    descriptionMarkdown: data.descriptionMarkdown
                })
                resolve({
                    errCode: 0,
                    errMessa: "create new handbook succes"
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}
let getAllHandbook = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Handbook.findAll();
            if (data && data.length > 0) {
                data.map(item => {
                    item.image = Buffer.from(item.image, 'base64').toString('binary');
                    return item;
                })

            }
            if (!data) data = [];
            resolve({
                errCode: 0,
                data: data
            })

        } catch (e) {
            reject(e);
        }
    })
}
module.exports = {
    postCreateClinic, getAllClinic, updateClinic, getDetailClinicById, createHandbook, getAllHandbook
}