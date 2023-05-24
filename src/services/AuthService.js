/**
 * Module for the AuthService.
 *
 * @version 1.0.0
 */

import { MongooseServiceBase } from './MongooseServiceBase.js'
import { AuthRepository } from '../repositories/AuthRepository.js'

/**
 * Encapsulates an Auth service.
 */
export class AuthService extends MongooseServiceBase {
  /**
   * Initializes a new instance.
   *
   * @param {AuthRepository} [repository=new AuthRepository()] - A repository instantiated from a class with the same capabilities as AuthRepository.
   */
  constructor (repository = new AuthRepository()) {
    super(repository)
  }

  /**
   * Authenticates an user.
   *
   * @param {string} username - ...
   * @param {string} pwd - ...
   * @returns {Promise<object>} Promise resolved with the found document as a plain JavaScript object.
   */
  async authenticate (username, pwd) {
    return this._repository.authenticate(username, pwd)
  }
}
