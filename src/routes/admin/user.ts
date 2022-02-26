import express, { Router } from 'express'
const router: Router = express.Router()

import userMainfest from '../../manifest/user'

router.route('/api/v1/user').get(new userMainfest().getManyUserApi)

export default router
