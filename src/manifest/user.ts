import express, { Request, Response, NextFunction } from 'express'
import userController from '../controllers/user'

export default class userMainfest {
   public async getManyUserApi(
      _req: Request,
      res: Response,
      _next: NextFunction
   ) {
      const userData = await new userController().getManyUser()
      return res.status(200).json(userData)
   }
}
