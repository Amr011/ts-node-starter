import { NextFunction, Request, Response } from 'express'
import { sign, verify } from 'jsonwebtoken'

export const userSignToken = async (id: string, email: string) => {
   return sign({ user: { id, email } }, jwtSecret, {
      expiresIn: '30 days',
   })
}

import dotenv from 'dotenv'
import { jwtSecret } from '../utils/constants'
dotenv.config()

export const verifyToken = (
   req: Request | any,
   res: Response,
   next: NextFunction
): any => {
   let accessToken = req.headers['authorization']
   if (!accessToken) {
      return res.status(400).json({
         success: false,
         message: 'no token provided',
      })
   } else {
      const validToken = verify(accessToken, jwtSecret)
      req.user = validToken

      if (validToken) {
         req.authenticated = true
         return next()
      }
   }
}
