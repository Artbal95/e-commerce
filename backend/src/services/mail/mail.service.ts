import {SendMailOptions} from "nodemailer";
import MailTransport from "../../config/mail/mail";

export const sendEmail = async (mailOptions: SendMailOptions): Promise<void> => {
    try {
        const info = await MailTransport.sendMail(mailOptions);
        console.log(`Email sent: ${info.response}`);
    } catch (err) {
        console.error(err)
        throw new Error("Email was not send");
    }
};
