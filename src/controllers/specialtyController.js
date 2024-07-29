import db from "../models"
import specialtyService from '../services/specialtyService'

let postCreateSpecialty = async (req, res) => {
    try {
        let infor = await specialtyService.postCreateSpecialty(req.body);
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

let getAllSpecialty = async (req, res) => {
    try {
        let infor = await specialtyService.getAllSpecialty();
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
let updateSpecialty = async (req, res) => {
    try {
        let infor = await specialtyService.updateSpecialty(req.body);
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
let getDetailSpecialtyById = async (req, res) => {
    try {
        let infor = await specialtyService.getDetailSpecialtyById(req.query.id, req.query.location);
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
    postCreateSpecialty, getAllSpecialty,
    updateSpecialty, getDetailSpecialtyById
}