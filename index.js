var fs = require('fs'),
    sys = require('sys'),
    exec = require('child_process').exec,
    nodemailer = require('nodemailer');

//configure email account
var smtpTransport = nodemailer.createTransport("SMTP",{
    service: "Gmail",
    auth: {
        user: "your_email@gmail.com",
        pass: "password"
    }
});

//configure email receiver
var mailOptions = {
    from: "You <your_email@gmail.com>", 
    to: "client_email@gmail.com", 
    subject: "New Ip", 
    text: ""
};

function puts(error, stdout, stderr) {
  fs.readFile(__dirname+'/config.inc','utf8', function (err,data) {
    if(!err && stdout != data) {
      fs.writeFile(__dirname+'/config.inc',stdout,'utf8',function (err) {

        mailOptions.text = stdout;
        smtpTransport.sendMail(mailOptions, function(error, response){
          if(error){
              console.log(error);
          }else{
              console.log("Message sent: " + response.message);
          }
          smtpTransport.close(); // shut down the connection pool, no more messages
        });

      });
    }
  }); 
}

exec("curl ipecho.net/plain", puts);
