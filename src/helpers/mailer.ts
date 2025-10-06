import nodemailer from 'nodemailer';
import User from '@/models/userModel';
import bcrypt from 'bcryptjs';


// export const sendEmail = async ({ email, emailType, userId }: any) => {
//     try {
//         //// create a hashed token
//         const hashedToken = await bcrypt.hash(userId.toString, 10)

//         if (emailType === "VERIFY") {

//             await User.findByIdAndUpdate(userId, {
//                 verifyToken: hashedToken,
//                 verifyTokenExpiry: Date.now() + 3600000,
//             })
//             if (emailType === "RESET") {
//                 await User.findByIdAndUpdate(userId, {
//                     forgotPasswordToken: hashedToken,
//                     forgotPasswordExpiry: Date.now() + 3600000,
//                 })
//             }
//         }



// const transporter = nodemailer.createTransport({
//     host: "sandbox.smtp.mailtrap.io",
//     port: 2525,
//     auth: {
//       user: process.env.SANDBOX_USER,
//       pass: process.env.SANDBOX_PASS
//     }
//   });

// const mailOptions = {
//   from: "adesh@gmail.com",
//   to: email,
//   subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
//   text: `Hello,

// Please click on the link below to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}:

// ${emailType === "VERIFY" ? "Verify Email Link" : "Reset Password Link"}:
// ${process.env.DOMAIN}/${emailType === "VERIFY" ? "verifyemail" : "resetpassword"}/${userId}/${hashedToken}

// If you did not request this, please ignore this email.

// Thanks,
// Your Team`
// };

// const mailResponse = await transporter.sendMail(mailOptions);
// return mailResponse;

//     } catch (error: any) {
//         throw new Error(error.message);
//     }
// }

export const sendEmail = async ({ email, emailType, userId }: any) => {
    try {
        const hashedToken = await bcrypt.hash(userId.toString(), 10);

        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId, {
                verifyToken: hashedToken,
                verifyTokenExpiry: Date.now() + 3600000,
            });
        } else if (emailType === "RESET") {
            await User.findByIdAndUpdate(userId, {
                forgotPasswordToken: hashedToken,
                forgotPasswordExpiry: Date.now() + 3600000,
            });
        }

        const transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: process.env.SANDBOX_USER,
                pass: process.env.SANDBOX_PASS
            },
            debug: true,
            logger: true
        });
const mailOptions = {
    from: "adesh@gmail.com",
    to: email,
    subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
    html: `
        <p>Hello,</p>
        <p>Please click on the link below to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}:</p>
        <p><a href="${process.env.DOMAIN}/${emailType === "VERIFY" ? "verifyemail" : "resetpassword"}/${userId}/${hashedToken}">Click here</a></p>
        <p>If you did not request this, please ignore this email.</p>
        <p>Thanks,<br/>Your Team</p>
    `
};

        const mailResponse = await transporter.sendMail(mailOptions);
        console.log("Email sent:", mailResponse);
        return mailResponse;

    } catch (error: any) {
        console.error("Error sending email:", error);
        throw new Error(error.message);
    }
}
