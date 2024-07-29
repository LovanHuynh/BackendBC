import { reject } from 'lodash';
import db from '../models/index';
import { where } from 'sequelize';
import emailServiece from './emailService'
import { v4 as uuidv4 } from 'uuid';


require('dotenv').config();

let biuldUrlEmail = (doctorId, token) => {
    let result = '';
    result = `${process.env.URL_REACT}/verify-booking?token=${token}&doctorId=${doctorId}`;
    return result;
}
let postBookAppointment = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.email || !data.date || !data.doctorId || !data.timeType ||
                !data.fullName || !data.doctorName || !data.selectedGender || !data.address
            ) {
                resolve({
                    errCode: 1,
                    errMessa: "Missing parameter"
                })
            } else {
                let token = uuidv4();
                await emailServiece.sendSimpleEmail({
                    receiverEmail: data.email,
                    patientName: data.fullName,
                    time: data.timeString,
                    language: data.language,
                    doctorName: data.doctorName,
                    recevierLink: biuldUrlEmail(data.doctorId, token)
                });
                //upsert patient
                let user = await db.User.findOrCreate({
                    where: { email: data.email },
                    defaults: {
                        email: data.email,
                        roleId: 'R3',
                        gender: data.selectedGender,
                        address: data.address,
                        firstName: data.fullName
                    }
                });
                //create  a booking record
                if (user && user[0]) {
                    await db.Booking.findOrCreate({
                        where: { patientId: user[0].id },
                        defaults: {
                            statusId: 'S1',
                            doctorId: data.doctorId,
                            patientId: user[0].id,
                            date: data.date,
                            timeType: data.timeType,
                            token: token
                        }
                    })

                }
                resolve({
                    errCode: 0,
                    errMessa: "save infor patient success",
                })
            }

        } catch (error) {
            reject(error);
        }
    })
}
let postVeryfiBookAppointment = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.token || !data.doctorId) {
                resolve({
                    errCode: 1,
                    errMessa: "Missing parameter"
                })
            } else {
                let appointment = await db.Booking.findOne({
                    where: {
                        doctorId: data.doctorId,
                        token: data.token,
                        statusId: 'S1'
                    },
                    raw: false
                })
                if (appointment) {
                    appointment.statusId = 'S2';

                    await appointment.save();
                    resolve({
                        errCode: 0,
                        errMessa: "Update to the appointment succes"
                    })
                } else {
                    resolve({
                        errCode: 2,
                        errMessa: "Update to the appointment failed"
                    })
                }

            }

        } catch (e) {
            reject(e);
        }
    })
}
module.exports = {
    postBookAppointment, postVeryfiBookAppointment
}