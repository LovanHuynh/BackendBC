import doctorService from "../services/doctorService"

let getTopDoctorHome = async (req, res) => {
    let limit = req.query.limit;
    if (!limit) {
        limit = 10
    }
    try {
        let response = await doctorService.getTopdoctorHome(+limit);
        return res.status(200).json(response)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            message: "Error from service"
        })
    }
}

let getAllDoctors = async (req, res) => {
    try {
        let doctors = await doctorService.getAllDoctor();
        res.status(200).json(doctors);

    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            message: "Error from service"
        })

    }
}
let postInforDoctor = async (req, res) => {
    try {
        let response = await doctorService.saveDetailInforDoctors(req.body);
        res.status(200).json(response);

    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            message: "Error from service"
        })

    }
}
let getDeatilDoctorById = async (req, res) => {
    try {
        let response = await doctorService.getDeatilDoctorById(req.query.id);
        res.status(200).json(response);

    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            message: "Error from service"
        })

    }
}
let bulkCreateSchedule = async (req, res) => {
    try {
        let infor = await doctorService.bulkCreateSchedule(req.body);
        res.status(200).json(infor);

    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            message: "Error from service"
        })

    }
}
let getScheduleDoctorByDate = async (req, res) => {
    try {
        let infor = await doctorService.getScheduleDoctorByDate(req.query.doctorId, req.query.date);
        res.status(200).json(infor);

    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            message: "Error from service"
        })

    }
}
let getInforDoctorById = async (req, res) => {
    try {
        let infor = await doctorService.getInforDoctorById(req.query.doctorId);
        res.status(200).json(infor);

    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            message: "Error from service"
        })

    }
}
let getProfileDoctorById = async (req, res) => {
    try {
        let infor = await doctorService.getProfileDoctorById(req.query.doctorId);
        res.status(200).json(infor);

    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            message: "Error from service"
        })

    }
}

//patient
let getLitsPatientForDoctor = async (req, res) => {
    try {
        let infor = await doctorService.getLitsPatientForDoctor(req.query.doctorId, req.query.date);
        res.status(200).json(infor);

    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            message: "Error from service"
        })

    }
}
let sendRemedy = async (req, res) => {
    try {
        let infor = await doctorService.sendRemedy(req.body);
        res.status(200).json(infor);

    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            message: "Error from service"
        })

    }
}
module.exports = {
    getTopDoctorHome: getTopDoctorHome,
    getAllDoctors: getAllDoctors,
    postInforDoctor: postInforDoctor,
    getDeatilDoctorById: getDeatilDoctorById,
    bulkCreateSchedule: bulkCreateSchedule,
    getScheduleDoctorByDate: getScheduleDoctorByDate,
    getInforDoctorById: getInforDoctorById,
    getProfileDoctorById: getProfileDoctorById,
    getLitsPatientForDoctor, sendRemedy
}