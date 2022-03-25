import { sign } from 'jsonwebtoken'
import { jwtSecret } from './constants'

export const userSignToken = async (id: string) => {
   return sign({ user: id }, jwtSecret, {
      expiresIn: '30 days',
   })
}
