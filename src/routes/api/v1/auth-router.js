/**
 * Auth routes.
 *
 * @version 1.0.0
 */

import express from 'express'

export const router = express.Router()

/**
 * Resolves an AuthController object from the IoC container.
 *
 * @param {object} req - Express request object.
 * @returns {object} An object that can act as a AuthController object.
 */
const resolveAuthController = (req) => req.app.get('container').resolve('AuthController')

// Map HTTP verbs and route paths to controller actions.

// POST
// Log in
router.post('/login', (req, res, next) => resolveAuthController(req).login(req, res, next))

// Register
router.post('/register', (req, res, next) => resolveAuthController(req).register(req, res, next))

// GET
// Logout
router.get('/logout', (req, res, next) => resolveAuthController(req).logout(req, res, next))
