import { Router } from 'express'
const router = Router()

import * as userController from '../controllers/user.controller'
import { verifyToken, verifyMessage } from '../middlewares'
import { validateCreateUser } from '../libs/validator'

router.post('/modify', verifyToken, validateCreateUser, userController.modify)

export default router
