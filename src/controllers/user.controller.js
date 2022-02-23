import User from "../models/user";
import Role from "../models/role";

import config from '../config'

export const modify = async (req, res) => {
    try {
        const { username, email, password, name, secondname, roles } = req.body

        const userFound = await User.findOne({ email: req.user.email }).populate('roles')

        if (!userFound) {
            console.log('User not connected')
            res.cookie('access-message', "Account not connected", config.OPTION).redirect('/')

        } else {
            const matchPassword = await User.comparePassword(
                req.body.currentpassword,
                userFound.password
            )

            if (!matchPassword) {
                return res.cookie('access-message', "Contraseña incorrecta", config.OPTION).redirect('/profile')
            }

            const update = await User.update({
                _id: userFound._id
            },
            {
                username,
                email,
                password: await User.encryptPassword(password),
                name,
                secondname,
                roles: userFound.roles
            })

            console.log('User modifying succesfully')
            console.log(userFound.roles)

            return res.cookie('access-message', "Usuario modificado correctamente", config.OPTION).redirect('/profile')
        }
    } catch (error) {
        console.log(error);
    }
}
