import express, { Application } from 'express'

import bodyParser from 'body-parser'
import cors from 'cors'
import morgan from 'morgan'

// Main Function
import cookieParser from 'cookie-parser'
import connectDatabase from './config/db.config'

async function ServerLancher(): Promise<void> {
   try {
      const app: Application = express()

      app.use(cookieParser())
      app.use(bodyParser.urlencoded({ extended: true }))
      app.use(morgan('dev'))
      app.use(cors())

      // Database Connection
      await connectDatabase()
         .then(() => console.log('Database connected successfully !'))
         .catch((err: any) => console.log(err))

      // Server Listen
      type PORT = number
      const port: PORT = 2022
      app.listen(port, () => {
         console.log(`Server is running  on port ${port}`)
      })
   } catch (error) {
      console.log(error)
   }
}
ServerLancher()
