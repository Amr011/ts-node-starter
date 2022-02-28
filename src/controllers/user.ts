import { user } from '../entity/user'
import errorHandler from '../utils/error-handling'

// Controller Layer
export default class userController {
   // get many users data controller function
   public getManyUser = async function (): Promise<user[]> {
      return await errorHandler(user.find())
   }
   // get one user data controller function
   public getOneUser = async function (id: number): Promise<user> {
      return await errorHandler(user.findOne({ where: { id: id } }))
   }
   // create one user data controller function
   public createOneUser = async function (data: user): Promise<boolean> {
      await errorHandler(user.create(data).save())
      return true
   }
   // update one user data controller function
   public updateOneUser = async function (
      id: number,
      data: user | any
   ): Promise<boolean> {
      await errorHandler(user.update({ id }, data))
      return true
   }
   // delete one user data controller function
   public deleteOneUser = async function (id: number): Promise<boolean> {
      await errorHandler(user.delete({ id }))
      return true
   }
}
