import nodemailer from 'nodemailer';
import User from '@/models/userModel';
import bcrypt from 'bcryptjs';
import { userInfo } from 'os';
import { verify } from 'crypto';

export const sendEmail = async ({ email, emailType, userId }: any) => {
    try {
        //// create a hashed token
        const hashedToken = await bcrypt.hash(userId.toString, 10)

        if (emailType === "VERIFY") {

            await User.findByIdAndUpdate(userId, {
                verifyToken: hashedToken,
                verifyTokenExpiry: Date.now() + 3600000,
            })
            if (emailType === "RESET") {
                await User.findByIdAndUpdate(userId, {
                    forgotPasswordToken: hashedToken,
                    forgotPasswordExpiry: Date.now() + 3600000,
                })
            }
        }


   
const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "d2052b198fd83a",
      pass: "1b69ad4bb8029a"
    }
  });


    } catch (error: any) {
        throw new Error(error.message);
    }
}