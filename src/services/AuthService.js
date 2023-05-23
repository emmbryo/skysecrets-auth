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
}
