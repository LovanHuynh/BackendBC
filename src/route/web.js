import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
import doctorController from "../controllers/doctorController";
import patientController from "../controllers/patientController";
import specialtyController from '../controllers/specialtyController';
import clinicController from '../controllers/clinicController';
let router = express.Router();

let initWebRouters = (app) => {

    router.get('/', homeController.getHomePage);

    router.get('/crud', homeController.getCRUD);// tao nguoi dung 
    router.post('/post-crud', homeController.postCRUD);

    router.get('/get-crud', homeController.displayGetCRUD);// hien thi nguoi dung len trang web

    router.get('/edit-crud', homeController.getEditCRUD);//lay thong tin sau do gui vao form sua
    router.post('/put-crud', homeController.putCRUD);

    router.get('/delete-crud', homeController.deleteCRUD);// xoa nguoi dung

    //bat dau viet api
    router.post('/api/login', userController.handleLogin);
    router.get('/api/get-all-users', userController.handleGetAllUsers);
    router.post('/api/create-new-user', userController.handleCreateNewUser);
    router.put('/api/edit-user', userController.handleEditNewUser);
    router.delete('/api/delete-user', userController.handleDeleteNewUser);

    router.get('/api/allcode', userController.getAllCode);
    router.get('/api/top-doctor-home', doctorController.getTopDoctorHome);
    router.get('/api/all-doctors', doctorController.getAllDoctors);
    router.post('/save-infor-doctors', doctorController.postInforDoctor);
    router.get('/get-detail-doctor-by-id', doctorController.getDeatilDoctorById);
    router.post('/api/bulk-create-schedule', doctorController.bulkCreateSchedule);
    router.get('/get-schedule-doctor-by-date', doctorController.getScheduleDoctorByDate);
    router.get('/api-extral-infor-doctor-by-id', doctorController.getInforDoctorById);
    router.get('/api-profile-doctor-by-id', doctorController.getProfileDoctorById);

    router.post('/api-patient-book-appointment', patientController.postBookAppointment);
    router.post('/api-verify-book-appointment', patientController.postVeryfiBookAppointment);
    //specialty
    router.post('/api-create-new-specialty', specialtyController.postCreateSpecialty);
    router.post('/api-update-specialty', specialtyController.updateSpecialty);
    router.get('/get-all-specialty', specialtyController.getAllSpecialty);
    router.get('/get-detail-specialty-by-id', specialtyController.getDetailSpecialtyById);
    //clinic
    router.post('/api-create-new-clinic', clinicController.postCreateClinic);
    router.post('/api-update-clinic', clinicController.updateClinic);
    router.get('/get-all-clinic', clinicController.getAllClinic);
    router.get('/get-detail-clinic-by-id', clinicController.getDetailClinicById);
    //patient
    router.get('/api-get-list-patient-for-doctor', doctorController.getLitsPatientForDoctor);
    router.post('/api/send-remedy', doctorController.sendRemedy);
    //handbook
    router.post('/api-create-handbook', clinicController.createHandbook);
    router.get('/get-all-handbook', clinicController.getAllHandbook);







    // bookingcare
    // xdti zrbt rrbf akwh

    return app.use("/", router);
}
module.exports = initWebRouters;