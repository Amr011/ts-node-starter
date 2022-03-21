import { hash } from 'bcryptjs'
import { sign, verify } from 'jsonwebtoken'
import { user } from '../entity/user'
import { IUserRegisterRequestBody } from '../types/IUserInput'
import { userVerifyTokenSecret } from '../utils/constants'
import { transporter } from '../utils/userSendEmailVerify'

// Controller Layer
export default class userController {
   // get many users data controller function
   public getManyUser = async function (): Promise<user[]> {
      return await user.find({
         relations: ['role'],
      })
   }
   // get one user data controller function
   public getOneUser = async function (id: number): Promise<user | undefined> {
      return await user.findOne({ where: { id } })
   }

   // registe user data controller function
   public registerUser = async function (
      data: IUserRegisterRequestBody,
      host: string
   ): Promise<boolean> {
      if (!data) return false
      let existedUser = await user.findOne({
         where: { email: data.email },
         select: ['email'],
      })
      if (existedUser) return false

      data.password = await hash(data.password, 12)
      await user.create(data).save()

      const verificationToken = sign(
         { email: data.email },
         userVerifyTokenSecret,
         {
            expiresIn: '7d',
         }
      )
      // Step 3 - Email the user a unique verification link
      const url = `${host}/api/v1/user/verify/${verificationToken}`
      transporter.sendMail({
         to: data.email,
         subject: 'Verify Account',
         html: `
         <H1>Hello ${data.firstname}</H1>
         <H3>YOUR EMAIL VIRIFICATION CODE IS HERE!</H3>
         Click <a href = '${url}'>here</a> to confirm your email.
         `,
      })

      return true
   }

   // verify user
   public verifyUser = async function (token: string): Promise<boolean> {
      let payload: any = verify(token, userVerifyTokenSecret)

      const userData: any = await user.findOne({
         email: payload['email'],
      })
      if (!user) {
         return false
      }
      await user.update({ id: userData.id }, { verified: true })

      return true
   }

   // update one user data controller function
   public updateOneUser = async function (
      id: number,
      data: user | any
   ): Promise<boolean> {
      await user.update({ id }, data)
      return true
   }
   // delete one user data controller function
   public deleteOneUser = async function (id: number): Promise<boolean> {
      await user.delete({ id })
      return true
   }
}
