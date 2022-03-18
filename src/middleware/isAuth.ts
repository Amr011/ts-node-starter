import { NextFunction, Request, Response } from 'express'
import { sign, verify } from 'jsonwebtoken'

import dotenv from 'dotenv'
import { jwtSecret } from '../utils/constants'
dotenv.config()

export const verifyToken = (
   req: Request,
   res: Response,
   next: NextFunction
): any => {
   let accessToken = req.cookies['access-token']
   if (!accessToken) {
      return res.status(400).json({
         success: false,
         message: 'no token provided',
      })
   }
}
