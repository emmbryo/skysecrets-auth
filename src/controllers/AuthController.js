/**
 * Module for the AuthController.
 *
 * @version 1.0.0
 */

// import createError from 'http-errors'
import jwt from 'jsonwebtoken'
import createError from 'http-errors'
import { UserModel } from '../models/UserModel.js'
import { AuthService } from '../services/AuthService.js'

/**
 * Encapsulates a controller.
 */
export class AuthController {
  /**
   * The service.
   *
   * @type {AuthService}
   */
  #service

  /**
   * Initializes a new instance.
   *
   * @param {AuthService} service - A service instantiated from a class with the same capabilities as AuthService.
   */
  constructor (service = new AuthService()) {
    this.#service = service
  }

  /**
   * Authenticates a user.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async login (req, res, next) {
    try {
      const user = await UserModel.authenticate(req.body.username, req.body.password)

      const payload = {
        sub: user.username,
        given_name: user.firstName,
        family_name: user.lastName,
        email: user.email,
        id: user.id
      }

      // reformat key from base64 to string before signing.
      const privateKey = Buffer.from(process.env.PRIVATE_KEY, 'base64').toString('ascii')

      // Create the access token.
      const accessToken = jwt.sign(payload, privateKey, {
        algorithm: 'RS256',
        expiresIn: process.env.ACCESS_TOKEN_LIFE
      })

      res
        .status(200)
        .json({
          access_token: accessToken
        })
    } catch (error) {
      // Authentication failed.
      const err = createError(401)
      err.cause = error
      err.message = 'Credentials invalid or not provided.'

      next(err)
    }
  }

  /**
   * Registers a user.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async register (req, res, next) {
    try {
      const user = new UserModel({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        permissionLevel: 1
      })

      await user.save()

      res
        .status(201)
        .json({ id: user.id })
    } catch (error) {
      let err = error

      if (err.code === 11000) {
        // Duplicated keys.
        err = createError(409)
        err.message = 'Conflict. Duplicated username and/or email.'
        err.cause = error
      } else if (error.name === 'ValidationError') {
        // Validation error(s).
        err = createError(400)
        err.message = 'The request cannot or will not be processed due to something that is perceived to be a client error (for example validation error).'
        err.cause = error
      }

      next(err)
    }
  }
}
