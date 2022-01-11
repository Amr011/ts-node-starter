import express, { Application } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import morgan from 'morgan'
;(async () => {
  const app: Application = express()

  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(morgan('dev'))
  app.use(cors())

  // Server Listen
  const port: number = 2022
  app.listen(port, () => {
    console.log(`Server is running  on port ${port}`)
  })
})()
