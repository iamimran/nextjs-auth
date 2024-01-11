import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import nodemailer from "nodemailer";
export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "4db2a9ccd12272",
        pass: "b8e70c812ab90a",
      },
    });

    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      //should be enum
      await User.findByIdAndUpdate(
        userId,
        {
          verifyToken: hashedToken,
          verifyTokenExpiry: Date.now() + 3600000,
        }
        // { new: true, runValidators: true }
      );
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(
        userId,
        {
          forgotPasswordToken: hashedToken,
          forgotPassworkTokenExpiry: Date.now() + 3600000,
        }
        // { new: true, runValidators: true }
      );
    }

    const mailOptions = {
      from: "iam.imran3@gmail.com", //🔥
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `<p>Click <a href =   "${
        process.env.domain
      }/verifyemail?token=${hashedToken}"> here</a> to ${
        emailType === "VERIFY" ? "verify your email" : "reset your password"
      }</p>`,
    };

    const mailResponse = await transport.sendMail(mailOptions);

    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
