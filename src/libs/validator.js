import { check, validationResult } from 'express-validator'
import config from '../config'

export const validateCreateUser = [
    check('email')
    .exists()
    .not()
    .isEmpty().withMessage('Campo de email vacio')
    .isEmail().withMessage('Formato de email invalido'),
    check('username')
    .isLength({ min: 4, max: 20 })
    .exists()
    .not()
    .isEmpty().withMessage('Campo de usuario vacio'),
    check('password')
    .isLength({ min: 4, max: 20 }).withMessage('Longitud de contraseña invalida')
    .exists()
    .not()
    .isEmpty().withMessage('Campo de contraseña vacio'),
    check('name')
    .isLength({ min: 3, max: 20 })
    .exists()
    .not()
    .isEmpty().withMessage('Campo de nombre vacio'),
    check('secondname')
    .isLength({ min: 3, max: 20 })
    .exists()
    .not()
    .isEmpty().withMessage('Campo de apellido vacio'),
    (req, res, next) => {
        try {
            validationResult(req).throw()
            return next()
        } catch (err) {
            const msg = err.array()
            res.cookie('access-message', msg[0].msg, config.OPTION).redirect('/')
        }
    }
]

export const validateLoginUser = [
    check('email')
    .exists()
    .not()
    .isEmpty().withMessage('Campo de email vacio')
    .isEmail().withMessage('Formato de email invalido'),
    check('password')
    .isLength({ min: 4, max: 20 }).withMessage('Longitud de contraseña invalida')
    .exists()
    .not()
    .isEmpty().withMessage('Campo de contraseña vacio'),
    (req, res, next) => {
        try {
            validationResult(req).throw()
            return next()
        } catch (err) {
            const msg = err.array()
            res.cookie('access-message', msg[0].msg, config.OPTION).redirect('/')
        }
    }
]

