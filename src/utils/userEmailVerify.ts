import { sign } from 'jsonwebtoken'
import { IUserRegisterRequestBody } from '../types/IUser'
import { userVerifyTokenSecret } from './constants'
import { transporter } from './userSendEmailVerify'

export async function userEmailVerify(
   data: IUserRegisterRequestBody,
   host: any
): Promise<void> {
   const userEmailVerificationToken = sign(
      { email: data.email },
      userVerifyTokenSecret,
      {
         expiresIn: 5000,
      }
   )

   // Email the user a unique verification link
   const url = `${host}/api/v1/user/verify/${userEmailVerificationToken}`
   transporter.sendMail({
      to: data.email,
      subject: 'Muallef Email Verification',
      html: `
         <H1>Hello ${data.firstname}</H1>
         <H3>YOUR EMAIL VIRIFICATION CODE IS HERE!</H3>
         Click <a href = '${url}'>here</a> to confirm your email.
         `,
   })
}
