import express, { Router } from 'express'
const router: Router = express.Router()

import userService from '../../service/user'

const user: userService = new userService()

// Get Method
router.route('/').get(user.getManyUser)
// Get Method
router.route('/:id').get(user.getOneUser)
// Post Method
router.route('/').post(user.createOneUser)
// Put Method
router.route('/:id').put(user.updateOneUser)
// Delete Method
router.route('/:id').delete(user.deleteOneUser)

export default router
