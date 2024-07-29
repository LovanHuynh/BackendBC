import { raw } from 'body-parser';
import db from '../models/index';
import { Model, where } from 'sequelize';
import _, { includes, reject } from "lodash"
import { RAW } from 'sequelize/lib/query-types';
import doctorInfor from '../models/doctor-Infor';
import emailService from './emailService'
require('dotenv').config();
const MAX_NUMBER_SCHEDULE = process.env.MAX_NUMBER_SCHEDULE;


let getTopdoctorHome = (limit) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findAll({
                limit: limit,
                where: { roleId: 'R2' },
                order: [['createdAt', "DESC"]],
                attributes: {
                    exclude: ['password']
                },
                include: [
                    { model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi'] },
                    { model: db.Allcode, as: 'genderData', attributes: ['valueEn', 'valueVi'] },
                ],
                raw: true,
                nest: true
            })
            resolve({
                errCode: 0,
                data: user
            })
        } catch (e) {
            reject(e);
        }
    })
}

let getAllDoctor = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let doctor = await db.User.findAll({
                where: { roleId: 'R2' },
                attributes: {
                    exclude: ['password', 'image']
                },
                include: [
                    {
                        model: DoctorInfor,
                        as: 'doctorInfor',
                        attributes: ['clinicId', 'specialtyId', 'addressClinic', 'nameClinic', 'note'],
                        include: [
                            {
                                model: Specialty,
                                as: 'specialty',
                                attributes: ['name', 'descriptionHTML', 'descriptionMarkdown']
                            }
                        ]
                    }
                ]

            });

            resolve({
                errCode: 0,
                data: doctor,
            });
        } catch (e) {
            reject(e);
        }
    })
}


let saveDetailInforDoctors = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            // selectedPrice: '',
            // selectedPayment: '',
            // selectedProvince: '',
            // Clinic: '',
            // AddressClinic: '',
            // note: '',
            if (!data || !data.contentHTML || !data.contentMarkdown || !data.action
                || !data.selectedPrice || !data.selectedPayment || !data.selectedProvince
                || !data.Clinic || !data.AddressClinic || !data.note || !data.specialtyId
                || !data.clinicId
            ) {
                resolve({
                    errCode: 1,
                    errMessa: "Missing parameter"
                })
            } else {
                //upsert to markdown
                if (data.action === 'CREATE') {
                    await db.Markdown.create({
                        contentHTML: data.contentHTML,
                        contentMarkdown: data.contentMarkdown,
                        description: data.description,
                        doctorId: data.doctorId
                    })
                } else if (data.action === 'EDIT') {
                    let doctorMarkdown = await db.Markdown.findOne({
                        where: { doctorId: data.doctorId },
                        raw: false
                    })
                    if (doctorMarkdown) {
                        doctorMarkdown.contentHTML = data.contentHTML;
                        doctorMarkdown.contentMarkdown = data.contentMarkdown;
                        doctorMarkdown.description = data.description;
                        doctorMarkdown.doctorId = data.doctorId;
                        //doctorMarkdown.updatedAt = new Date();
                        await doctorMarkdown.save();
                    }
                }
                //upsearch to doctorinfor   
                let doctorinfor = await db.DoctorInfor.findOne({
                    where: {
                        doctorId: data.doctorId
                    },
                    raw: false
                })

                if (doctorinfor) {
                    //update
                    doctorinfor.priceId = data.selectedPrice;
                    doctorinfor.paymentId = data.selectedPayment;
                    doctorinfor.provinceId = data.selectedProvince;
                    doctorinfor.nameClinic = data.Clinic;
                    doctorinfor.addressClinic = data.AddressClinic;
                    doctorinfor.note = data.note;
                    doctorinfor.specialtyId = data.specialtyId;
                    doctorinfor.clinicId = data.clinicId;
                    await doctorinfor.save();


                } else {
                    //create
                    await db.DoctorInfor.create({
                        doctorId: data.doctorId,
                        priceId: data.selectedPrice,
                        paymentId: data.selectedPayment,
                        provinceId: data.selectedProvince,
                        nameClinic: data.Clinic,
                        addressClinic: data.AddressClinic,
                        note: data.note,
                        specialtyId: data.specialtyId,
                        clinicId: data.clinicId
                    })
                }


                resolve({
                    errCode: 0,
                    errMessa: "save info doctor success"
                })
            }

        } catch (e) {
            reject(e)
        }
    })
}
let getDeatilDoctorById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id) {
                resolve({
                    errCode: 1,
                    errMessa: "Missing requied Parameter!"
                })
            } else {
                let data = await db.User.findOne({
                    where: { id: id },
                    attributes: {
                        exclude: ['password']
                    },
                    include: [
                        { model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi'] },
                        {
                            model: db.Markdown,
                            attributes: ['description', 'contentHTML', 'contentMarkdown']
                        },
                        {
                            model: db.DoctorInfor,
                            include: [
                                { model: db.Allcode, as: 'PriceData', attributes: ['valueEn', 'valueVi'] },
                                { model: db.Allcode, as: 'PaymentData', attributes: ['valueEn', 'valueVi'] },
                                { model: db.Allcode, as: 'ProvinceData', attributes: ['valueEn', 'valueVi'] },
                            ]
                        },

                    ],
                    raw: false,
                    nest: true
                })
                if (data && data.image) {
                    data.image = new Buffer(data.image, 'base64').toString('binary');
                }
                if (!data) data = {};
                resolve({
                    errCode: 0,
                    data: data
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}
let bulkCreateSchedule = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            //console.log("check: ", data)
            if (!data.arrSchedule || !data.doctorId || !data.date) {
                resolve({
                    errCode: 1,
                    errMessa: "Missing requied Parameter!"

                })
            } else {
                let schedule = data.arrSchedule;
                if (schedule && schedule.length > 0) {
                    schedule.map((item) => {
                        item.maxNumber = MAX_NUMBER_SCHEDULE;
                        return item;
                    })
                }
                let exitsting = await db.Schedule.findAll({
                    where: { doctorId: data.doctorId, date: data.date },
                    attributes: ['timeType', 'date', 'doctorId', 'maxNumber'],
                    raw: true,
                })
                // if (exitsting && exitsting.length > 0) {
                //     exitsting.map(item => {
                //         item.date = new Date(item.date).getTime();
                //         return item;
                //     })
                // }
                // console.log("data: ", exitsting)
                // console.log("data2: ", schedule.date)
                let toCreate = _.differenceWith(schedule, exitsting, (a, b) => {
                    return a.timeType === b.timeType && +a.date === +b.date;
                })

                //console.log("check:", schedule)
                await db.Schedule.bulkCreate(toCreate)
                resolve({
                    errCode: 0,
                    errMessa: "ok"
                });
            }

        } catch (e) {
            reject(e);
        }
    })
}
let getScheduleDoctorByDate = (doctorId, date) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!doctorId || !date) {
                resolve({
                    errCode: 1,
                    errMessa: "Missing requied Parameter!"

                })
            } else {
                let data = await db.Schedule.findAll({
                    where: { doctorId: doctorId, date: date },
                    include: [
                        { model: db.Allcode, as: 'timeTypeData', attributes: ['valueEn', 'valueVi'] },
                        { model: db.User, as: 'doctorData', attributes: ['firstName', 'lastName'] }
                    ],
                    nest: true,
                    raw: false
                })
                if (!data) data = [];
                resolve({
                    errCode: 0,
                    data: data
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}
let getInforDoctorById = (doctorId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!doctorId) {
                resolve({
                    errCode: 1,
                    errMessa: "Missing requied Parameter!"

                })
            } else {
                let data = await db.DoctorInfor.findOne({
                    where: {
                        doctorId: doctorId
                    },
                    attributes: {
                        exclude: ['id', 'doctorId']
                    },
                    include: [
                        { model: db.Allcode, as: 'PriceData', attributes: ['valueEn', 'valueVi'] },
                        { model: db.Allcode, as: 'PaymentData', attributes: ['valueEn', 'valueVi'] },
                        { model: db.Allcode, as: 'ProvinceData', attributes: ['valueEn', 'valueVi'] },
                    ],
                    raw: false,
                    nest: true,
                })
                //console.log("check data: ", data)
                if (!data) data = [];
                resolve({
                    errCode: 0,
                    data: data
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

let getProfileDoctorById = (doctorId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!doctorId) {
                resolve({
                    errCode: 1,
                    errMessa: "Missing requied Parameter!"

                })
            } else {
                let data = await db.User.findOne({
                    where: { id: doctorId },
                    attributes: {
                        exclude: ['password']
                    },
                    include: [
                        { model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi'] },
                        {
                            model: db.Markdown,
                            attributes: ['description']
                        },

                        {
                            model: db.DoctorInfor,
                            include: [
                                { model: db.Allcode, as: 'PriceData', attributes: ['valueEn', 'valueVi'] },
                                { model: db.Allcode, as: 'PaymentData', attributes: ['valueEn', 'valueVi'] },
                                { model: db.Allcode, as: 'ProvinceData', attributes: ['valueEn', 'valueVi'] },
                            ]
                        },

                    ],
                    raw: false,
                    nest: true
                })
                if (data && data.image) {
                    data.image = new Buffer(data.image, 'base64').toString('binary');
                }
                if (!data) data = [];
                resolve({
                    errCode: 0,
                    data: data
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}
//patient
let getLitsPatientForDoctor = (doctorId, date) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!doctorId || !date) {
                resolve({
                    errCode: 1,
                    errMessa: "Missing requied Parameter!"

                })
            } else {
                let data = await db.Booking.findAll({
                    where: {
                        statusId: 'S2',
                        doctorId: doctorId,
                        date: date
                    }, include: [
                        {
                            model: db.User, as: 'patientData',
                            attributes: ['email', 'firstName', 'address', 'gender'],
                            include: [
                                { model: db.Allcode, as: 'genderData', attributes: ['valueEn', 'valueVi'] }],
                        },
                        {
                            model: db.Allcode, as: 'timeTypeDataBook', attributes: ['valueEn', 'valueVi']
                        },
                        {
                            model: db.Allcode, as: 'statusData', attributes: ['valueEn', 'valueVi']
                        }

                    ],
                    raw: false,
                    nest: true
                })
                resolve({
                    errCode: 0,
                    data: data
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

let sendRemedy = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.email || !data.doctorId || !data.patientId || !data.timeType) {
                resolve({
                    errCode: 1,
                    errMessa: "Missing requied Parameter!"

                })
            } else {
                //update patient status
                let appointment = await db.Booking.findOne({
                    where: {
                        doctorId: data.doctorId,
                        patientId: data.patientId,
                        timeType: data.timeType,
                        statusId: 'S2'
                    },
                    raw: false

                })
                if (appointment) {
                    appointment.statusId = 'S3';
                    appointment.save();
                }
                //send email remedy
                // console.log(data)
                await emailService.sendAttachment(data)
                resolve({
                    errCode: 0,

                    errMessa: 'oke'
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}
module.exports = {
    getTopdoctorHome: getTopdoctorHome,
    getAllDoctor: getAllDoctor,
    saveDetailInforDoctors: saveDetailInforDoctors,
    getDeatilDoctorById: getDeatilDoctorById,
    bulkCreateSchedule: bulkCreateSchedule,
    getScheduleDoctorByDate: getScheduleDoctorByDate,
    getInforDoctorById: getInforDoctorById,
    getProfileDoctorById: getProfileDoctorById,
    getLitsPatientForDoctor, sendRemedy
}