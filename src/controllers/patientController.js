import db from '../models/index';
import patientService from "../services/patientService";

let postBookAppointment = async (req, res) => {
    try {
        let infor = await patientService.postBookAppointment(req.body);

        res.status(200).json(infor);

    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            message: "Error from service"
        })

    }
}
let postVeryfiBookAppointment = async (req, res) => {
    try {
        let infor = await patientService.postVeryfiBookAppointment(req.body);

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
    postBookAppointment, postVeryfiBookAppointment
}