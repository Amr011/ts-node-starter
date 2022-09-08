import { sign } from 'jsonwebtoken'
import { IUserRegisterRequestBody } from '../types/IUser'

import nodemailer from 'nodemailer'
import {
   userVerifyTokenSecret,
   transporterEmailPassword,
   transporterEmailService,
   transporterEmailUser,
} from '../utils/constants'

export const transporter = nodemailer.createTransport({
   service: transporterEmailService,
   auth: {
      user: transporterEmailUser,
      pass: transporterEmailPassword,
   },
})

export async function userEmailVerify(
   data: IUserRegisterRequestBody,
   host: string
): Promise<void> {
   const userEmailVerificationToken = sign(
      { email: data.email },
      userVerifyTokenSecret,
      {
         expiresIn: '7d',
      }
   )

   // Email the user a unique verification link
   const url = `${host}/api/v1/user/verify/${userEmailVerificationToken}`
   transporter.sendMail({
      to: data.email,
      subject: 'Email Verification',
      html: `
         <H1>Hello ${data.firstname}</H1>
         <H3>YOUR EMAIL VIRIFICATION CODE IS HERE!</H3>
         Click <a href = '${url}'>here</a> to confirm your email.
         `,
   })
}
