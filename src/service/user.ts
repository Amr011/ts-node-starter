import { Request, Response, NextFunction, Router } from 'express'
import userController from '../controllers/user'
import { user } from '../entity/user'
import { IUserLoginRequestBody, IUserRegisterRequestBody } from '../types/IUser'
import { userSignToken } from '../middleware/Authentication'

const controller = new userController()

// Service Layer
export default class userService {
   // get many users data service function
   public async getManyUser(_req: Request, res: Response, _next: NextFunction) {
      const userData: user[] = await controller.getManyUser()
      return res.status(200).json(userData)
   }

   // get one user data service function
   public async getOneUser(req: Request, res: Response, _next: NextFunction) {
      const { id } = req.params
      const userData: user | undefined = await controller.getOneUser(
         parseInt(id)
      )
      return res.status(200).json(userData)
   }

   // registe user data service function
   public async registerUser(req: Request, res: Response, _next: NextFunction) {
      const data: IUserRegisterRequestBody = req.body
      const hostName = req.protocol + '://' + req.headers['host']
      const userData = await controller.registerUser(data, hostName)
      return res.status(200).json(userData)
   }

   // verify user email service function
   public async verifyUser(req: Request, res: Response, _next: NextFunction) {
      const token: string = req.params.token
      const userData = await controller.verifyUser(token)
      return res.status(200).json(userData)
   }

   // login user service function
   public async loginUser(req: Request, res: Response, next: NextFunction) {
      const data: IUserLoginRequestBody = req.body
      const token = await controller.loginUser(data)
      if (token) req.headers['authorization'] = token
      return res.status(200).json(token)
   }

   // update one user data service function
   public async updateOneUser(
      req: Request,
      res: Response,
      _next: NextFunction
   ) {
      const { id } = req.params
      const { data } = req.body
      const userData: boolean = await controller.updateOneUser(
         parseInt(id),
         data
      )
      return res.status(200).json(userData)
   }
   // delete one user data service function
   public async deleteOneUser(
      req: Request,
      res: Response,
      _next: NextFunction
   ) {
      const { id } = req.params
      const userData: boolean = await controller.deleteOneUser(parseInt(id))
      return res.status(200).json(userData)
   }
}
