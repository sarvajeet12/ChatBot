const Transporter = require('../configs/emailConfig');


const sendMailToUser = async (email, title, body) => {

    let info = await Transporter.sendMail({
        from: "ChatBot",
        to: `${email}`,
        subject: `${title}`,
        html: `${body}`
    })

    // console.log("Info: ", info);

    return info;  // optional
}


module.exports = sendMailToUser;