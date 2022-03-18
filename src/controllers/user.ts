import { hash } from 'bcryptjs'
import { sign, verify } from 'jsonwebtoken'
import { user } from '../entity/user'
import { IUserRegisterRequestBody } from '../types/IUserInput'
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
      data: IUserRegisterRequestBody
   ): Promise<boolean> {
      if (!data) return false

      let existedUser = await user.findOne({
         where: { email: data.email },
         select: ['email'],
      })

      if (existedUser) return false

      // Step 2 -
      const verificationToken = sign(
         { email: data.email },
         'sdsdssdsd12312132',
         {
            expiresIn: '7d',
         }
      )
      // Step 3 - Email the user a unique verification link
      const url = `http://localhost:2022/api/v1/user/verify/${verificationToken}`
      transporter.sendMail({
         to: data.email,
         subject: 'Verify Account',
         html: `Click <a href = '${url}'>here</a> to confirm your email.`,
      })

      data.password = await hash(data.password, 12)
      await user.create(data).save()
      return true
   }
   // verify user
   public verifyUser = async function (token: string): Promise<boolean> {
      const validToken = verify(token, 'sdsdssdsd12312132')
      console.log(validToken)
      //   user.findOne({})
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
