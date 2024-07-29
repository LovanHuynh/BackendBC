require('dotenv').config();
const nodemailer = require("nodemailer");


let sendSimpleEmail = async (dataSend) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // Use `true` for port 465, `false` for all other ports
        auth: {
            user: process.env.EMAIL_APP,
            pass: process.env.EMAIL_APP_PASSWORD,
        },
    });

    let info = await transporter.sendMail({
        from: '"Bookingcare 👻" <huynhsth@gmail.com>', // sender address
        to: dataSend.receiverEmail, // list of receivers
        subject: "Thông tin đặt lịch khám bệnh", // Subject line
        html: getBodyEmailHtml(dataSend), // html body
    });
}
let getBodyEmailHtml = (dataSend) => {
    let result = [];
    if (dataSend.language === 'vi') {
        result = `
        <h3>Xin chào ${dataSend.patientName}!</h3>
        <p>Bạn nhận được email này vì đã đặt lịch khám bệnh online trên Bookingcare</p>
        <p>Thông tin đặt lịch khám bênh:</p>
        <div><b>Thời gian: ${dataSend.time}</b></div>
        <div><b>Bác sĩ: ${dataSend.doctorName}</b></div>
        <p>Nếu các thông tin trên là đúng sự thật vui lòng click vào đường linh bên dưới để xác nhận và hoàn tất thủ tục đặt lịch khám bệnh:</p>
        <div>
        <a href=${dataSend.recevierLink} target="_blank">Click here</a>
        </div>
        <p>Xin chân thành cảm ơn</p>

        `
    }
    if (dataSend.language === 'en') {
        result = `
        <h3>Dear ${dataSend.patientName}!</h3>
        <p>You received this email because you booked an online medical appointment on Bookingcare</p>
        <p>Information for scheduling medical examination:</p>
        <div><b>Time: ${dataSend.time}</b></div>
        <div><b>Doctor: ${dataSend.doctorName}</b></div>
        <p>If the above information is true, please click on the link below to confirm and complete the medical examination appointment procedure:</p>
        <div>
        <a href=${dataSend.recevierLink} target="_blank">Click here</a>
        </div>
        <p>thank you so much</p>

        `
    }
    return result;
}
let sendAttachment = async (dataSend) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // Use `true` for port 465, `false` for all other ports
        auth: {
            user: process.env.EMAIL_APP,
            pass: process.env.EMAIL_APP_PASSWORD,
        },
    });

    let info = await transporter.sendMail({
        from: '"Bookingcare 👻" <huynhsth@gmail.com>', // sender address
        to: dataSend.email, // list of receivers
        subject: "Kết quả đặt lịch khám bệnh", // Subject line
        html: getBodyEmailHtmlRemedy(dataSend), // html body
        attachments: [
            {
                filename: `Remedy-${dataSend.patientId}-${new Date().getTime()}.png`,
                content: dataSend.imgbase64.split('base64,')[1],
                encoding: 'base64'
            }
        ],
    });
}
let getBodyEmailHtmlRemedy = (dataSend) => {
    let result = '';
    if (dataSend.language === 'vi') {
        result = `
        <h3>Xin chào ${dataSend.patientName}!</h3>
        <p>Bạn nhận được email này vì đã đặt lịch khám bệnh online trên Bookingcare thanh cong</p>
        <p>Thông tin đơn thuốc, hóa đơn được gửi trong file đính kèm:</p>
        
        <p>Nếu các thông tin trên là đúng sự thật vui lòng click vào đường linh bên dưới để xác nhận và hoàn tất thủ tục đặt lịch khám bệnh:</p>
       
        <p>Xin chân thành cảm ơn</p>

        `
    }
    if (dataSend.language === 'en') {
        result = `
        <h3>Dear ${dataSend.patientName}!</h3>
        <p>You received this email because you booked an online medical appointment on Bookingcare</p>
        <p>Information for scheduling medical examination:</p>
       
        <p>If the above information is true, please click on the link below to confirm and complete the medical examination appointment procedure:</p>
        
        <p>thank you so much</p>

        `
    }
    return result;
}
module.exports = {
    sendSimpleEmail, getBodyEmailHtml, sendAttachment, getBodyEmailHtmlRemedy
}