// server.js
const express = require("express"),
  nodeMailer = require("nodemailer"),
  bodyParser = require("body-parser"),
  cors = require("cors"),
  app = express();
app.use(cors());
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set("port", process.env.PORT || 1122);

// Start node server
app.get("/", function (req, res) {
  res.send(JSON.stringify({ message: "email sending server is working fine url is /send-email" }));
});

app.post("/send-email", function (req, res) {
  let transporter = nodeMailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "milhas.jean@gmail.com",
      pass: "B023991w",
    },
  });
  const generateHTML= ()=>{
    let mainString =  ``
    Object.keys(req.body).forEach((key)=>{
      mainString += `<p>${key.includes("_")?key.split("_").join(" "):key} : ${req.body[key]}</p>`
    })
    return mainString
  }
  let mailOptions = {
    from: '"Krunal Lathiya"', // sender address
    to: "Warren.kiriakou@gmail.com", // list of receivers
    subject: `${req.body.cardholder_name} requested a new refund`, // Subject line
    html: generateHTML(), // html body
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

app.listen(app.get("port"), function () {
  console.log("Node server is running on port localhost:" + app.get("port"));
});