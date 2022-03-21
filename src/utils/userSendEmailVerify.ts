import nodemailer from 'nodemailer'
import {
   transporterEmailPassword,
   transporterEmailService,
   transporterEmailUser,
} from './constants'
export const transporter = nodemailer.createTransport({
   service: transporterEmailService,
   auth: {
      user: transporterEmailUser,
      pass: transporterEmailPassword,
   },
})
