import { Router } from 'express'
const router = Router()

import * as authController from '../controllers/auth.controller'
import { validateCreateUser, validateLoginUser } from '../libs/validator'

router.post('/signup', validateCreateUser, authController.signUp)
router.post('/signin', validateLoginUser, authController.signIn)
router.get('/logout', authController.logOut)

export default router
