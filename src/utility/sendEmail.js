const nodemailer = require('nodemailer');

const sendResetPasswordEmail = (email,subject, data) => {

    try {
        // create reusable transporter object using the default SMTP transport
        const transporter = nodemailer.createTransport({
            host: "",
            port: "",
            secure:true,
            auth: {
                user: "",
                pass: ""
            }
        });

        const mailOptions = () => {
            return {
                from: "",
                to: email,
                subject: subject,
                html: data
            }

        };

        // Send email
        transporter.sendMail(mailOptions(), (error, info) => {
            if (error) {
                return error;
            } else {
                return info
            }
        });
    } catch (error) {
        return error;
    }
}


module.exports =  sendResetPasswordEmail;