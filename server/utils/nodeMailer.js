import nodemailer from 'nodemailer'


const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "srxcold@gmail.com",
      pass: "eifunliqjukwjjnw",
    },
  });

  async function sendVerificationEmail(userEmail, verificationCode) {
    const mailOptions = {
      from: "srxcold@gmail.com",
      to: userEmail,
      subject: "Verify your email address",
      text: `Please use the following verification code: ${verificationCode}`,
    };
    try {
      await transporter.sendMail(mailOptions);
      console.log("Verification email sent successfully");
    } catch (error) {
      console.error("Error sending verification email:", error);
    }
  }

  export default sendVerificationEmail
