import User from "../models/user";
import Role from "../models/role";

import jwt from 'jsonwebtoken'
import config from '../config'

export const signUp = async (req, res) => {
    try {
        const { username, email, password, name, secondname, roles } = req.body
        const userFound = await User.find({
                $or: [
                    {username},
                    {email}
                ]
            })

        if (userFound.length == 0) {
            const newUser = new User({
                username,
                email,
                password: await User.encryptPassword(password),
                name,
                secondname
            })

            if (req.body.roles) {
                const foundRoles = await Role.find({ name: { $in: roles } });
                newUser.roles = foundRoles.map((role) => role._id);
            } else {
                const role = await Role.findOne({ name: "client" });
                newUser.roles = [role._id];
            }

            const savedUser = await newUser.save()

            const token = jwt.sign({ id: savedUser._id }, config.SECRET, {
              expiresIn: 300
            })

            console.log('Account has been created')
            return res.cookie('x-access-token', token, config.OPTION).redirect('/profile') 

        } else {
            console.log('Account already exist')
            return res.cookie('access-message', "Email o usuario ya existe", config.OPTION).redirect('/')
        }

    } catch (error) {
        console.log(error);
        return res.redirect('/')
    }
}

export const signIn = async (req, res) => {
    try {
        const userFound = await User.findOne({ email: req.body.email }).populate('roles')

        if (!userFound) {
            console.log('Email not match')
            res.cookie('access-message', "Email no coincide", config.OPTION).redirect('/')

        } else {
            const matchPassword = await User.comparePassword(
                req.body.password,
                userFound.password
            )

            if (!matchPassword) {
                return res.cookie('access-message', "Contraseña incorrecta", config.OPTION).redirect('/')
            }

            const token = jwt.sign({ id: userFound._id }, config.SECRET, {
                expiresIn: 300
            })

            console.log('User connected succesfully')

            return res.cookie('x-access-token', token, config.OPTION).redirect('/profile') 
        }

    } catch (error) {
        console.log(error);
    }
} 


export const logOut = async (req, res) => { 
    try {
        return res.clearCookie('x-access-token').redirect('/') 
    } catch (error) {
        console.log(error);
    }
}
