import nodemailer from "nodemailer"

export const sendEmail = async (
  recipient: string,
  sendingLink: string,
  recipient_name: string,
  template: string
): Promise<boolean> => {
  {
    const transport = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE, //ex. gmail
      auth: {
        user: process.env.EMAIL_ADDRESS, //"example@gmail.com",
        pass: process.env.EMAIL_PASSWORD, //"Example-Password-123!!!",
      },
    });

    const mailOptions = {
      from: `"Yura Khachatryan" <yurakhachatryan3@gmail.com>`,
      to: `${recipient}`,
      subject: "URL for reset password for E-commerce",
      html: template
        .replace("${resetPasswordURL}", sendingLink)
        .replace("${name}", recipient_name),
    };

    try {
      const info = await transport.sendMail(mailOptions);
      console.log(`Email sent: ${info.response}`);
      return true;
    } catch (err) {
      throw new Error("Email was not send");
    }
  }
};
