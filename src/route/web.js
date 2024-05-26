import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";

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


    return app.use("/", router);
}
module.exports = initWebRouters;