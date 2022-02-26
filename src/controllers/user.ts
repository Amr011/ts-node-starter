import { user } from '../entity/user'

export default class userController {
   public getManyUser = async function (): Promise<user | any> {
      return user.find()
   }
}
