/**
 * Module for AuthRepository.
 *
 * @version 1.0.0
 */

import { MongooseRepositoryBase } from './MongooseRepositoryBase.js'
import { UserModel } from '../models/UserModel.js'

/**
 * Encapsulates an Auth repository.
 */
export class AuthRepository extends MongooseRepositoryBase {
  /**
   * Initializes a new instance.
   *
   * @param {UserModel} [model=UserModel] - A class with the same capabilities as UserModel.
   */
  constructor (model = UserModel) {
    super(model)
  }

  /**
   * Authenticates an user.
   *
   * @param {string} username - ...
   * @param {string} pwd - ...
   * @returns {Promise<object>} Promise resolved with the found document as a plain JavaScript object.
   */
  async authenticate (username, pwd) {
    return this.model.authenticate(username, pwd)
  }
}
