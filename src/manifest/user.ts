import { Request, Response, NextFunction, Router } from 'express'
import { stat } from 'fs'
import userController from '../controllers/user'
import { user } from '../entity/user'

const controller = new userController()

// Manifest Layer
export default class userMainfest {
   // get many users data manifest function
   public async getManyUser(_req: Request, res: Response, _next: NextFunction) {
      const userData: user[] = await controller.getManyUser()
      return res.status(200).json(userData)
   }

   // get one user data manifest function
   public async getOneUser(req: Request, res: Response, _next: NextFunction) {
      const { id } = req.params
      const userData: user = await controller.getOneUser(parseInt(id))
      return res.status(200).json(userData)
   }

   // create one user data manifest function
   public async createOneUser(
      req: Request,
      res: Response,
      _next: NextFunction
   ) {
      const user: user = req.body
      const userData: boolean = await controller.createOneUser(user)
      return res.status(200).json(userData)
   }

   // update one user data manifest function
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
   // delete one user data manifest function
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
