import { Router } from 'express'
const router = Router()

import { verifyToken, verifyMessage } from '../middlewares'

router.get('/', verifyMessage, (req, res)=>{
    res.render('index.html', { user: 0, msg: req.msg })
})


router.get('/profile', verifyMessage, verifyToken, (req, res)=>{
    res.render('profile.html', { user: req.user, msg: req.msg })
})

export default router
