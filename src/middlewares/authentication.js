import jwt from 'jsonwebtoken'
import config from '../config'

import User from '../models/user'

export const verifyToken = async (req, res, next) => {
    try {
        const token = req.cookies["x-access-token"]

        if (!token) return res.cookie('access-message', "No ha iniciado sesión", config.OPTION).redirect('/')

        const decoded = jwt.verify(token, config.SECRET)

        const user = await User.findById(decoded.id, {password: 0}).populate('roles')

        if (!user) return res.cookie('access-message', "Usuario no encontrado", config.OPTION).redirect('/')
        req.user = user

        next()
    } catch (error) {
        return res.cookie('access-message', "Desautorizado", config.OPTION).redirect('/')
    }
}
