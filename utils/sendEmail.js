const nodeMailer = require("nodemailer");

module.exports = async (email, subject, text) => {
  try {
    const transporter = nodeMailer.createTransport({
      host: process.env.HOST,
    //   service: process.env.SERVICE,
    //   port: 465,
    //   secure: true,
    //   service: process.env.SERVICE,
    port: 587,
    secure: false,

      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
    });
    await transporter.sendMail({
      from: process.env.USER,
      to: email,
      subject: subject,
      text: text,
    });
    console.log("Email Sent Sucessfully");
  } catch (error) {
    console.log(error, "EMail not sent");
  }
};
