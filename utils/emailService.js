import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendVerificationEmail = async (email, verificationLink) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Email Verification",
      html: `<h3>Click <a href="${verificationLink}">here</a> to verify your email.</h3>`,
    });
    console.log("✅ Verification email sent");
  } catch (error) {
    console.error("❌ Email sending failed:", error);
  }
};

export default sendVerificationEmail;
