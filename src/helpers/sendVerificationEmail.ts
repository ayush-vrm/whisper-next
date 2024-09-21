import nodemailer from "nodemailer";
import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string
): Promise<ApiResponse> {
  try {
    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST, // e.g., 'smtp.gmail.com' for Gmail
      port: 587, // Typically 587 for secure SMTP
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.MAIL_USER, // Your email username
        pass: process.env.MAIL_PASS, // Your email password
      },
    });

    // Send verification email
    const mailOptions = {
      from: '"Whisper Support" <no-reply@whisper.com>', // Sender address
      to: email, // Recipient email address
      subject: "Whisper: Verification Code", // Subject line
      html: `<p>Hello ${username},</p>
             <p>Your verification code is: <strong>${verifyCode}</strong></p>
             <p>This code will expire in 1 hour.</p>`, // HTML body content
    };

    const info = await transporter.sendMail(mailOptions);

    console.log("Email sent response:", info);

    return {
      success: true,
      message: "Verification email sent successfully",
    };
  } catch (emailError) {
    console.error("Error sending verification email", emailError);
    return {
      success: false,
      message: "Failed to send verification email",
    };
  }
}
