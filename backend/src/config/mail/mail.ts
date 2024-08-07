import nodemailer from "nodemailer";
import {EMAIL_ADDRESS, EMAIL_PASSWORD} from "../environment";

console.log({EMAIL_ADDRESS, EMAIL_PASSWORD})

const MailTransport = nodemailer.createTransport({
    service: "gmail",
    from: `"Yura Khachatryan" <yurakhachatryan3@gmail.com>`,
    auth: {
        user: EMAIL_ADDRESS,
        pass: EMAIL_PASSWORD,
    },
});

export default MailTransport;
