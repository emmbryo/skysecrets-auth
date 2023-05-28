/**
 * API version 1 routes.
 *
 * @version 1.0.0
 */

import express from 'express'
import { router as authRouter } from './auth-router.js'

export const router = express.Router()

router.get('/', (req, res) => res.json({ message: 'Hooray! Welcome to version 1 of this authorization API! With this API you can create an account, login and receive a JWT to be able to authenticate yourself.' }))

router.use('/', authRouter)
