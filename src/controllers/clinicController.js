import db from "../models"
import clinicService from '../services/clinicService'

let postCreateClinic = async (req, res) => {
    try {
        let infor = await clinicService.postCreateClinic(req.body);
        //return res.send('post  form lable');

        res.status(200).json(infor);

    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            message: "Error from service"
        })

    }
}

let getAllClinic = async (req, res) => {
    try {
        let infor = await clinicService.getAllClinic();
        //return res.send('post crud form lable');

        res.status(200).json(infor);

    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            message: "Error from service"
        })

    }
}
let updateClinic = async (req, res) => {
    try {
        let infor = await clinicService.updateClinic(req.body);
        //return res.send('post crud form lable');

        res.status(200).json(infor);

    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            message: "Error from service"
        })

    }
}
let getDetailClinicById = async (req, res) => {
    try {
        let infor = await clinicService.getDetailClinicById(req.query.id);
        //return res.send('post crud form lable');

        res.status(200).json(infor);

    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            message: "Error from service"
        })

    }
}
let createHandbook = async (req, res) => {
    try {
        let infor = await clinicService.createHandbook(req.body);
        //return res.send('post crud form lable');

        res.status(200).json(infor);

    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            message: "Error from service"
        })

    }
}
let getAllHandbook = async (req, res) => {
    try {
        let infor = await clinicService.getAllHandbook();
        //return res.send('post crud form lable');

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
    postCreateClinic, getAllClinic,
    updateClinic, getDetailClinicById,
    createHandbook, getAllHandbook
}