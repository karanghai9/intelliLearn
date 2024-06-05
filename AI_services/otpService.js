const nodemailer = require('nodemailer');

// Create a Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_ID,
        pass: process.env.GMAIL_PASS
    }
});

function sendOTP(email) {
    const otp = generateOTP();
    const mailOptions = {
      from: 'th-bingen University',
      to: email,
      subject: 'OTP Verification',
      text: `Your OTP for verification is: ${otp}`
    };
  
    return transporter.sendMail(mailOptions)
      .then(() => {

        response = {
                "OtpGenrated":true,
                "Otp":otp
            }
        return response; 
      })
      .catch(error => {
        return {
                'OtpGenrated':false,
                'Error sending OTP: ' : error.message ,
               }
      });
  }


function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000);
}

module.exports = { sendOTP ,generateOTP};
