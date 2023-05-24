/**
 * Module for bootstrapping.
 *
 * @author Mats Loock
 * @author Emma Fransson
 * @version 1.0.0
 */

import { IoCContainer } from '../util/IoCContainer.js'

import { UserModel } from '../models/UserModel.js'
import { AuthService } from '../services/AuthService.js'
import { AuthController } from '../controllers/AuthController.js'
import { AuthRepository } from '../repositories/AuthRepository.js'

const iocContainer = new IoCContainer()

iocContainer.register('ConnectionString', process.env.DB_CONNECTION_STRING)

iocContainer.register('UserModelType', UserModel, { type: true })

iocContainer.register('AuthRepositorySingleton', AuthRepository, {
  dependencies: [
    'UserModelType'
  ],
  singleton: true
})

iocContainer.register('AuthServiceSingleton', AuthService, {
  dependencies: [
    'AuthRepositorySingleton'
  ],
  singleton: true
})

iocContainer.register('AuthController', AuthController, {
  dependencies: [
    'AuthServiceSingleton'
  ]
})

export const container = Object.freeze(iocContainer)
