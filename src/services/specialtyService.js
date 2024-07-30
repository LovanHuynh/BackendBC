
import { where } from 'sequelize';
import db from '../models/index';
import { raw } from 'body-parser';
let postCreateSpecialty = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.name || !data.image || !data.descriptionHTML || !data.descriptionMarkdown) {
                resolve({
                    errCode: 1,
                    errMessa: "Missing requied Parameter!"

                })
            }
            else {
                await db.Specialty.create({
                    name: data.name,
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

let getAllSpecialty = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Specialty.findAll();
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
let updateSpecialty = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id || !data.name || !data.image || !data.descriptionHTML || !data.descriptionMarkdown) {
                resolve({
                    errCode: 1,
                    errMessa: "Missing requied Parameter!"

                })
            } else {
                let res = await db.Specialty.findOne({
                    where: { id: data.id },
                    raw: false
                });
                if (res) {
                    res.name = data.name;
                    res.image = data.image;
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
let getDetailSpecialtyById = (id, location) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id || !location) {
                resolve({
                    errCode: 1,
                    errMessa: "Missing requied Parameter!"

                })
            } else {
                let data = await db.Specialty.findOne({
                    where: { id: id },
                    attributes: ['descriptionHTML', 'descriptionMarkdown'],
                    //raw: false
                });

                if (data) {
                    let doctorSpecialty = [];
                    if (location === 'ALL') {
                        doctorSpecialty = await db.DoctorInfor.findAll({
                            where: {
                                specialtyId: id
                            },
                            attributes: ['doctorId', 'provinceId'],
                            //raw: false
                        })
                    } else {
                        doctorSpecialty = await db.DoctorInfor.findAll({
                            where: {
                                specialtyId: id,
                                provinceId: location
                            },
                            attributes: ['doctorId', 'provinceId'],
                            //raw: false
                        })
                    }

                    data.doctorSpecialty = doctorSpecialty;
                    // data = data.map(item => {
                    //     return { ...item, doctorSpecialty: doctorSpecialty };
                    // });
                } else { data = {} };
                //console.log("check", data)
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

module.exports = {
    postCreateSpecialty, getAllSpecialty, updateSpecialty, getDetailSpecialtyById
}