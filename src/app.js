import express from 'express'
import morgan from 'morgan'
import path from 'path'
import cookieParser from 'cookie-parser'

import authRoutes from './routes/auth.routes'
import userRoutes from './routes/user.routes'
import viewRoutes from './routes/view.routes'

import { createRoles, createAdmin} from "./libs/initialSeed";

const app = express()
createRoles()
createAdmin()

// Settings
app.set("port", process.env.PORT || 3000)
app.set('views', path.join(__dirname, 'views'))
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'ejs')

// Middlewares
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

// Routes
app.use('/auth', authRoutes)
app.use('/user', userRoutes)
app.use('/', viewRoutes)

// Static files
app.use(express.static(path.join(__dirname, 'files')))

export default app

