const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'yahoo',
  auth: {
    user: 'h19920604@yahoo.com.tw',
    pass: 'lnyzdkzzvyxphsec'
  }
});

function sendEmail(to, subject, body) {
  const mailOptions = {
    from: 'h19920604@yahoo.com.tw',
    to,
    subject,
    text: body
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

module.exports = { sendEmail };
